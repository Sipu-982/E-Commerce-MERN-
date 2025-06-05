import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import bg1 from '../Images/bg1.png';
import bg2 from '../Images/bg2.png';
import bg3 from '../Images/bg3.png';
import bg4 from '../Images/bg4.png';

const BannerCrousel = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const CustomButtonGroup = ({ next, previous }) => {
    return (
      <div className="absolute top-1/2 -left-6 -right-6 flex justify-between px-4 transform -translate-y-1/2">
            <button
              onClick={previous}
              className="bg-white text-neutral-800 p-3 w-12 h-25 rounded-lg shadow-md transition"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="bg-white text-neutral-800 p-3 w-12 rounded-lg shadow-md  transition"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
    );
  };

  const bannerData = [
    { img: bg1 },
    { img: bg2},
    { img: bg3},
    { img: bg4},
  ];

  return (
    <div className="mx-4 my-4">
      <div className="w-full min-h-[200px] relative overflow-hidden">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          transitionDuration={800}
          customButtonGroup={<CustomButtonGroup />}
          arrows={false}
        >
          {bannerData.map((banner, index) => (
            <div
              key={index}
              className={`flex items-center justify-center w-full min-h-[200px] ${banner.bg}`}
            >
              <img
                src={banner.img}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default BannerCrousel;
