
import type React from 'react';
import BlinkingCursor from './BlinkingCursor';

const Header: React.FC = () => {
  return (
    <header className="py-6 text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-shadow-primary inline-flex items-center">
        DevTerm
        <BlinkingCursor />
      </h1>
    </header>
  );
};

export default Header;
