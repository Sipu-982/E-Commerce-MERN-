import React from 'react';
import Cards1 from './Cards1';
import Cards2 from './Cards2';
import Cards3 from './Cards3';

const TopPicks = () => {
  return (
    <div className="w-full p-3">
      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        <Cards1 />
        <Cards2 />
        <Cards3 />
      </div>
    </div>
  );
};

export default TopPicks;
