import React from 'react';
import laptops from '../Images/laptop-img.png';
import shirts from '../Images/shirt-img.png';
import jeans from '../Images/jean-img.png';
import mobiles from '../Images/mobile-img.png';
import electronics from '../Images/Gadgets.png';
import shoes from '../Images/shoe-img.png';
import Watches from '../Images/watch-img.png';
import toys from '../Images/Toy.png';
import Grocery from '../Images/grocery-img.png';

// ✅ Clean category data
const categories = [
  { label: "Laptop", img: laptops },
  { label: "Shirt", img: shirts },
  { label: "Jean", img: jeans },
  { label: "Mobile", img: mobiles },
  { label: "Electronic", img: electronics },
  { label: "Shoe", img: shoes },
  { label: "Watch", img: Watches },
  { label: "Toy", img: toys },
  { label: "Grocery", img: Grocery }
];

const Catagories = ({ onSelect }) => {
  return (
    <div className='my-2 flex justify-center mx-3 bg-white min-h-[20vh] py-2 px-2 rounded'>
      <div className="flex items-center gap-x-[70px] justify-center overflow-x-auto">
        {categories.map((cat, index) => (
          <button
  key={index}
  onClick={() => onSelect(cat.label)}
  className="flex flex-col cursor-pointer items-center group"
>
  <div className="w-20 h-20  rounded-full group-hover:border-orange-500 shadow-md rounded-b-lg shadow-gray-50 group-hover:shadow-oranges-200 p-2 transition-all duration-300 ease-in-out">
    <img src={cat.img} alt={cat.label} className="w-full h-full object-contain" />
  </div>
  <span className="text-xs font-semibold mt-1 group-hover:text-blue-600 transition">{cat.label}</span>
</button>

        ))}
      </div>
    </div>
  );
};

export default Catagories;
