import React from 'react';
import { useRouter } from 'next/router';
import { PostCard, Loader, CategoryList } from '../../components';
import { getAllCategories, getPostsByCategory } from '../../lib/posts';

const CategoryPost = ({ posts, categoryName }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h1 className="text-3xl font-semibold mb-4">
              Posts in <span className="text-pink-600">{categoryName}</span>
            </h1>
            <p className="text-gray-600">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
            </p>
          </div>
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.slug} post={post} />)
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
              <p className="text-center text-gray-600">No posts found in this category.</p>
            </div>
          )}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <CategoryList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPost;

export async function getStaticProps({ params }) {
  const posts = await getPostsByCategory(params.slug);

  const categories = await getAllCategories();
  const category = categories.find((cat) => cat.slug === params.slug);
  const categoryName = category ? category.name : params.slug;

  return {
    props: {
      posts,
      categoryName,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const categories = await getAllCategories();

  return {
    paths: categories.map((category) => ({
      params: { slug: category.slug },
    })),
    fallback: true,
  };
}
