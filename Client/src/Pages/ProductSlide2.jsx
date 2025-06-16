import React from 'react';
import { Link } from 'react-router-dom';

import bg1 from '../Images/grocery-bg.jpg';
import bg2 from '../Images/speakers.jpg';
import bg3 from '../Images/smart-watch.jpg';

const bg = [
  { background: bg1,category: 'Grocery' },
  { background: bg2,category: 'Electronic' },
  { background: bg3,category: 'Electronic' },

];

const ProductSlide2 = () => {
  return (
    <div className="mx-4 my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-2 gap-y-4">
      {bg.map((picture, index) => (
        <Link key={index} to={`/products?category=${picture.category}`}>
          <div className="overflow-hidden">
            <img
              src={picture.background}
              alt={`Offer ${index + 1}`}
              className="w-full h-[250px] object-cover"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductSlide2;
