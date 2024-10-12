import React from 'react';
import backgroundImg from '/background.png'; // Adjust the path as needed

const Header: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-[-1]">
      <img
        src={backgroundImg}
        alt="Background"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Header;
