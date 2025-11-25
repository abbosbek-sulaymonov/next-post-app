import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);
  console.log(typeof categories);
  console.log(categories);

  return (
    <div className="bg-white shadow-lg p-8 mb-8 rounded-lg">
      <h3 className="text-lg font-semibold mb-8">Categories</h3>
      {categories.map((category) => (
        <Link href={`/category/${category.slug}`} key={category.id}>
          <span className="block cursor-pointer pb-3 mb-3 text-indigo-800 hover:text-indigo-400 transition duration-200">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
