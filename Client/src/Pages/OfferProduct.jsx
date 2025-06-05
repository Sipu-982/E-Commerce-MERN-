import React from 'react';
import { Link } from 'react-router-dom';
import bg1 from '../Images/shoes-bg.jpg';
import bg2 from '../Images/puma-shooes.png'; // Corrected extension
import bg3 from '../Images/wrogn-bg.png';   // Corrected extension

const bg = [
  { background: bg1 },
  { background: bg2 },
  { background: bg3 },
];

const OfferProduct = () => {
  return (
    <div className="mx-4 my-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {bg.map((picture, index) => (
        <Link key={index} to="#">
          <img
            src={picture.background}
            alt={`Offer ${index + 1}`}
            className="w-full h-[215px] object-cover"
          />
        </Link>
      ))}
    </div>
  );
};

export default OfferProduct;
