
import type React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ElementType;
}

const socialLinks: SocialLink[] = [
  { name: 'Email', url: 'mailto:youremail@example.com', icon: Mail },
  { name: 'GitHub', url: 'https://github.com/yourusername', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: Linkedin },
  { name: 'Resume', url: '/resume.pdf', icon: FileText },
];

const ContactSectionContent: React.FC = () => {
  return (
    <div className="mt-2 text-muted-foreground">
      <p className="mb-3 text-sm md:text-base">
        Feel free to reach out! I'm always open to discussing new projects, creative ideas, or opportunities.
      </p>
      <div className="flex flex-wrap gap-2">
        {socialLinks.map((link) => (
          <Button key={link.name} variant="outline" size="sm" asChild className="border-accent text-accent hover:bg-accent hover:text-accent-foreground focus:ring-accent text-xs md:text-sm">
            <a href={link.url} target={link.name === 'Email' ? '_self' : '_blank'} rel="noopener noreferrer" className="flex items-center">
              <link.icon size={16} className="mr-1.5" /> {/* Adjusted icon size and margin */}
              {link.name}
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
};
export default ContactSectionContent;
