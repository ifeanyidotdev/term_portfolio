
import type React from 'react';

const BlinkingCursor: React.FC = () => {
  return <span className="animate-blink w-2.5 h-6 bg-accent inline-block ml-1" aria-hidden="true"></span>;
};

export default BlinkingCursor;
