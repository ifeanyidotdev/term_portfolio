import type React from "react";
import { UserCircle } from "lucide-react";

const AboutSectionContent: React.FC = () => {
  const skills = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "NestJS",
    "Express",
    "GraphQL",
    "Firebase",
    "Python",
    "Django",
    "Flutter",
  ];

  return (
    <div className="mt-2 space-y-3 text-muted-foreground">
      <div className="flex flex-col sm:flex-row items-start gap-3">
        <UserCircle
          size={50}
          className="text-primary shrink-0 mt-1 hidden sm:block"
        />
        <p className="text-sm md:text-base leading-relaxed">
          I'm a passionate fullstack developer with over half a decade of
          experience building web and mobile applications. My journey in
          software development began before college, where I discovered my love
          for creating interactive digital experiences.
        </p>
        <p className="text-sm md:text-base leading-relaxed">
          I specialize in building robust, scalable applications using modern
          frameworks and best practices. My goal is to create software that not
          only functions flawlessly but also provides an exceptional user
          experience.
        </p>
      </div>
      <div>
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-1.5">
          Core Skills:
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-sm text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AboutSectionContent;
