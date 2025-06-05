import React from 'react';
import { useNavigate } from 'react-router-dom';
import Popular from './Popular';
import Catagories from './Catagories';
import BannerCrousel from './BannerCrousel';
import Fashion from './Fashion';
import OfferProduct from './OfferProduct';
// import OfferProduct1 from './OfferProduct2';
import OfferProduct2 from './OfferProduct2';
import ProductSlide from './ProductSlide';
import ProductSlide2 from './ProductSlide2';
import JeansProduct from './JeansProduct';
import TopPicks from './TopPicks';

const Home = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    navigate(`products?category=${category}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Catagories onSelect={handleCategorySelect} />
      <BannerCrousel />
      <Popular />
      <Fashion/>
      <OfferProduct/>
      <OfferProduct2/>
      <TopPicks/>
      <ProductSlide/>
      <ProductSlide2/>
      <JeansProduct/>
    </div>
  );
};

export default Home;
