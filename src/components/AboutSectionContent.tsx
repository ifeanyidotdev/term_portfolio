
import type React from 'react';
import { UserCircle } from 'lucide-react';

const AboutSectionContent: React.FC = () => {
  const skills = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Firebase", "GenAI"];

  return (
    <div className="mt-2 space-y-3 text-muted-foreground">
      <div className="flex flex-col sm:flex-row items-start gap-3">
        <UserCircle size={50} className="text-primary shrink-0 mt-1 hidden sm:block" />
        <p className="text-sm md:text-base leading-relaxed">
          Hello! I'm a passionate developer specializing in building modern web applications.
          With a strong foundation in JavaScript, React, and Next.js, I love crafting intuitive user experiences
          and robust backend solutions. My goal is to leverage technology to solve real-world problems
          and create impactful digital products.
        </p>
      </div>
      <div>
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-1.5">Core Skills:</h3>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span key={skill} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-sm text-xs">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AboutSectionContent;
