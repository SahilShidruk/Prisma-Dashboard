import React from 'react';
import { Link } from 'react-router-dom';

const ServerCard = ({ imgSrc, title }) => {
  return (
    <div className="bg-black m-6 rounded-xl h-32 md:h-40 lg:h-48 w-auto flex flex-col items-center justify-center">
      <Link to="/" className="flex flex-col items-center w-full p-4">
        <div className="avatar w-16 h-16 mb-2">
          <img 
            src={imgSrc} 
            className="ring-primary ring-offset-base-100 rounded-full ring ring-offset-2" 
            alt="Avatar"
          />
        </div>
        <div className="text-xl font-bold text-center">
          {title}
        </div>
      </Link>
    </div>
  );
};

export default ServerCard;
