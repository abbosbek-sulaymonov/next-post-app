import React from 'react';
import moment from 'moment';
import Image from 'next/image';

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case 'heading-three':
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case 'paragraph':
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case 'heading-four':
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case 'image':
        return (
          <div key={index} className="relative w-full h-96 my-8">
            <Image src={obj.src} alt={obj.title || 'Content image'} layout="fill" objectFit="contain" />
          </div>
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      {/* Post Featured Image */}
      <div className="relative overflow-hidden shadow-md mb-6 h-96">
        <Image
          src={post.image.url}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="shadow-lg rounded-t-lg lg:rounded-lg"
          priority
        />
      </div>

      <div className="px-4 lg:px-0">
        {/* Author and Date Section */}
        <div className="flex items-center mb-8 w-full">
          <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
            <div className="relative w-[30px] h-[30px]">
              <Image
                src={post.author.photo.url}
                alt={post.author.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.author.name}</p>
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
            <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
          </div>
        </div>

        {/* Post Title */}
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>

        {/* Post Short Description */}
        <div className="text-gray-700 text-lg leading-relaxed mb-8">{post.shortPost}</div>

        {/* Rich Content (if available) */}
        {post.content?.raw && (
          <div className="mt-8 prose max-w-none">
            {JSON.parse(post.content.raw).children.map((typeObj, index) => {
              const children = typeObj.children.map((item, itemindex) =>
                getContentFragment(itemindex, item.text, item),
              );

              return getContentFragment(index, children, typeObj, typeObj.type);
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
