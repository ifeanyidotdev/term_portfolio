
import type React from 'react';
import TerminalCommand from './TerminalCommand';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Twitter, Instagram, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ElementType;
}

const socialLinks: SocialLink[] = [
  { name: 'Email', url: 'mailto:youremail@example.com', icon: Mail },
  { name: 'GitHub', url: 'https://github.com/yourusername', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: Linkedin },
  { name: 'Resume', url: '/resume.pdf', icon: FileText }, // Example link to a resume PDF
  // { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: Twitter },
  // { name: 'Instagram', url: 'https://instagram.com/yourusername', icon: Instagram },
];

const ContactSection: React.FC = () => {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <Card className="bg-card shadow-xl">
        <CardHeader>
          <TerminalCommand command="get_contact_info" />
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6 text-base md:text-lg">
            Feel free to reach out! I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.
          </p>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <Button key={link.name} variant="outline" asChild className="border-accent text-accent hover:bg-accent hover:text-accent-foreground focus:ring-accent">
                <a href={link.url} target={link.name === 'Email' ? '_self' : '_blank'} rel="noopener noreferrer" className="flex items-center">
                  <link.icon size={20} className="mr-2" />
                  {link.name}
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ContactSection;
