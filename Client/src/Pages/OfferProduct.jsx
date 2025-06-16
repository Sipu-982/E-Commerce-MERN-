import React from 'react';
import { Link } from 'react-router-dom';
import bg1 from '../Images/shoes-bg.jpg';
import bg2 from '../Images/puma-shooes.png';
import bg3 from '../Images/wrogn-bg.png';

const bg = [
  { background: bg1, category: 'Shoe' },
  { background: bg2, category: 'Shoe' },
  { background: bg3, category: 'Shirt' },
];

const OfferProduct = () => {
  return (
    <div className="mx-4 my-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {bg.map((item, index) => (
        <Link
          key={index}
          to={`/products?category=${item.category}`}
          className="block relative w-full h-[215px] overflow-hidden"
        >
          <img
            src={item.background}
            alt={`Offer ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </Link>
      ))}
    </div>
  );
};

export default OfferProduct;
