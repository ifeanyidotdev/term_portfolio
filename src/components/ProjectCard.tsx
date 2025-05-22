
import type React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Code2 } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
  image: string;
  dataAiHint?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="border border-border rounded-md p-3 bg-card/70 shadow-md flex flex-col h-full text-sm"> {/* Adjusted padding and base text size */}
      <div className="aspect-[16/9] relative w-full overflow-hidden rounded-sm mb-2">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          data-ai-hint={project.dataAiHint || "technology abstract"}
        />
      </div>
      <h3 className="text-lg text-primary font-semibold">{project.title}</h3> {/* Adjusted title size */}
      <p className="text-xs md:text-sm text-muted-foreground mt-1 mb-2 flex-grow h-16 overflow-y-auto">{project.description}</p> {/* Adjusted description size and height */}

      <div className="mb-2">
        <h4 className="text-xs font-semibold text-foreground mb-1 flex items-center">
          <Code2 size={14} className="mr-1 text-accent" /> {/* Adjusted icon size */}
          Technologies:
        </h4>
        <div className="flex flex-wrap gap-1">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-1.5 py-0.5 bg-secondary text-secondary-foreground text-[10px] rounded-xs">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-auto flex flex-wrap gap-1.5 justify-start"> {/* Reduced gap */}
        {project.repoUrl && (
          <Button variant="outline" size="sm" asChild className="text-xs px-2 py-1 h-auto">
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <span>
                <Github size={12} className="mr-1" /> GitHub
              </span>
            </a>
          </Button>
        )}
        {project.liveUrl && (
          <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90 text-xs px-2 py-1 h-auto">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <span>
                <ExternalLink size={12} className="mr-1" /> Live Demo
              </span>
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
