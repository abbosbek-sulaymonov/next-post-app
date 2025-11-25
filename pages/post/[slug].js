import React from 'react';
import { useRouter } from 'next/router';
import { Author, Categories, Comments, CommentsForm, PostDetail, PostWidget, Loader } from '../../components';
import { getAllPosts, getPostBySlug } from '../../lib/posts';

const PostDetails = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  if (!post) {
    return (
      <div className="container mx-auto px-10 mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Post not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { notFound: true };
  return { props: { post: JSON.parse(JSON.stringify(post)) }, revalidate: 60 };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return { paths: posts.map(({ node }) => ({ params: { slug: node.slug } })), fallback: true };
}
