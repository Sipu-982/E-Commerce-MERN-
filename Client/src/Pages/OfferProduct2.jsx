import React from 'react';
import { Link } from 'react-router-dom';
import bg1 from '../Images/shirts-bg.jpg';
import bg2 from '../Images/motorla.jpg';
import bg3 from '../Images/mobiles-bg.jpg';
import bg4 from '../Images/laptops.jpg';
import bg5 from '../Images/infinix.jpg';
import bg6 from '../Images/earbuds.jpg';

const bg = [
  { background: bg1 },
  { background: bg2 },
  { background: bg3 },
  { background: bg4 },
  { background: bg5 },
  { background: bg6 },
];

const OfferProduct2 = () => {
  return (
    <div className="mx-4 my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-2 gap-y-4">
      {bg.map((picture, index) => (
        <Link key={index} to="#">
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

export default OfferProduct2;
