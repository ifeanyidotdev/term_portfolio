import type React from 'react';

const BlinkingCursor: React.FC = () => {
  return <span className="animate-blink w-[3px] h-[1.1em] bg-accent inline-block ml-0.5 align-text-bottom" aria-hidden="true"></span>; // Adjusted size and alignment
};

export default BlinkingCursor;