import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import Image from 'next/image';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded shadow-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6 h-80">
        <Image
          src={post.image.url}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>

      {/* Post Title */}
      <h1 className="transition duration-700 hover:text-indigo-700 cursor-pointer text-center mb-8 text-3xl font-semibold">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>

      {/* Author and Date */}
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
          <div className="relative w-[30px] h-[30px]">
            <Image
              src={post.author.photo.url}
              alt={post.author.name}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <p className="inline align-middle text-gray-700 ml-2 text-lg">{post.author.name}</p>
        </div>
        <div className="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="align-middle">{moment(post.createdAt).format('DD MMM YYYY')}</span>
        </div>
      </div>

      {/* Post Excerpt */}
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">{post.shortPost}</p>

      {/* Continue Reading Button */}
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span className="transition duration-500 transform hover:-translate-y-1 inline-block bg-indigo-800 text-lg font-medium rounded-full text-white px-8 py-4 cursor-pointer">
            Continue Reading
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
