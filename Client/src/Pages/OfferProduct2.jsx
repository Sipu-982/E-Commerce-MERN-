import React from 'react';
import { Link } from 'react-router-dom';
import bg1 from '../Images/shirts-bg.jpg';
import bg2 from '../Images/motorla.jpg';
import bg3 from '../Images/mobiles-bg.jpg';
import bg4 from '../Images/laptops.jpg';
import bg5 from '../Images/infinix.jpg';
import bg6 from '../Images/earbuds.jpg';

const bg = [
  { background: bg1,category: 'Shirt' },
  { background: bg2,category: 'Mobile' },
  { background: bg3,category: 'Mobile' },
  { background: bg4,category: 'Laptop' },
  { background: bg5,category: 'Mobile' },
  { background: bg6,category: 'Electronic' },
];

const OfferProduct2 = () => {
  return (
    <div className="mx-4 my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-2 gap-y-4">
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

export default OfferProduct2;
