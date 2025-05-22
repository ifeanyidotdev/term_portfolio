
import type React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 mt-12 border-t border-border text-center">
      <p className="text-sm text-muted-foreground">
        &copy; {currentYear} DevTerm Portfolio. All rights reserved.
      </p>
      <p className="text-xs text-muted-foreground/70 mt-1">
        Powered by Next.js, Tailwind CSS, and a touch of terminal magic.
      </p>
    </footer>
  );
};

export default Footer;
