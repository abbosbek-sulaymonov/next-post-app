import React from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';

const Header = () => {
  const { data: categories = [], isLoading } = useQuery(
    'popularCategories',
    async () => {
      const response = await fetch('/api/popular-categories?limit=3');
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  );

  return (
    <div className="container mx-auto px-10 mb-10">
      <div className="border-b w-full inline-block border-blue-500 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">Abek Blog</span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {!isLoading &&
            categories.length > 0 &&
            categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer hover:text-pink-500 transition duration-200">
                  {category.name}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
