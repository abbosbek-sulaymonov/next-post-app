import Head from 'next/head';
import { Categories, PostCard, PostWidget } from '../components';
import { getAllPosts } from '../lib/posts';

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10">
      <Head>
        <title>My Blog</title>
        <meta name="description" content="A blog built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard post={post.node} key={index} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();
  return { props: { posts: JSON.parse(JSON.stringify(posts)) }, revalidate: 60 };
}
