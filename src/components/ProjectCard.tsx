
import type React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className="bg-card shadow-lg overflow-hidden flex flex-col h-full">
      <CardHeader>
        <div className="aspect-[16/9] relative w-full overflow-hidden rounded-t-md">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint={project.dataAiHint || "technology abstract"}
          />
        </div>
        <CardTitle className="mt-4 text-2xl text-primary">{project.title}</CardTitle>
        <CardDescription className="text-muted-foreground h-20 overflow-y-auto">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
            <Code2 size={18} className="mr-2 text-accent" />
            Technologies Used:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex flex-wrap gap-2 justify-start">
        {project.repoUrl && (
          <Button variant="outline" size="sm" asChild>
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Github size={16} className="mr-2" /> GitHub
            </a>
          </Button>
        )}
        {project.liveUrl && (
          <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} className="mr-2" /> Live Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
