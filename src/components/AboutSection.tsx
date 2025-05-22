
import type React from 'react';
import TerminalCommand from './TerminalCommand';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UserCircle } from 'lucide-react';

const AboutSection: React.FC = () => {
  const skills = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Firebase", "GenAI"];

  return (
    <section id="about" aria-labelledby="about-heading">
      <Card className="bg-card shadow-xl">
        <CardHeader>
          <TerminalCommand command="show_about_me" />
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <UserCircle size={80} className="text-primary shrink-0" />
            <p className="text-base md:text-lg leading-relaxed">
              Hello! I'm a passionate developer specializing in building modern web applications. 
              With a strong foundation in JavaScript, React, and Next.js, I love crafting intuitive user experiences 
              and robust backend solutions. My goal is to leverage technology to solve real-world problems 
              and create impactful digital products.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Core Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AboutSection;
