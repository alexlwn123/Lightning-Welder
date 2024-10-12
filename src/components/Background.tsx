import React from 'react';
import backgroundImg from '/background.png'; // Adjust the path as needed

export const Background: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 w-full h-full z-[-1] bg-gray-200" // Add a placeholder background color
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};
