import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import moment from 'moment';
import Image from 'next/image';
import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ slug, categories }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((res) => setRelatedPosts(res));
    } else {
      getRecentPosts().then((data) => setRelatedPosts(data));
    }
  }, [slug, categories]);

  return (
    <div className="bg-white shadow-lg p-8 mb-8 rounded-lg">
      <h3 className="text-lg font-semibold mb-8">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
      {relatedPosts.map((post, index) => (
        <div key={`${post.slug}-${index}`} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <div className="relative w-16 h-16">
              <Image src={post.image.url} alt={post.title} layout="fill" objectFit="cover" className="rounded-full" />
            </div>
          </div>
          <div className="flex-grow ml-4 border-b">
            <p className="text-gray-700 text-xs">{moment(post.createdAt).format('DD MMM YYYY')}</p>
            <Link href={`/post/${post.slug}`}>
              <span className="text-indigo-800 hover:text-indigo-400 transition duration-200 cursor-pointer">
                {post.title}
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
