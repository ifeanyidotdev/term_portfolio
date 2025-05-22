
import type React from 'react';
import TerminalCommand from './TerminalCommand';
import ProjectCard, { type Project } from './ProjectCard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const projectsData: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-featured online store with product listings, cart functionality, and payment integration. Built for scalability and performance.',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    repoUrl: 'https://github.com/example/ecommerce',
    liveUrl: '#',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'online store',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative tool for managing projects and tasks, featuring real-time updates and user authentication.',
    technologies: ['React', 'Firebase', 'Node.js', 'Express', 'Material UI'],
    repoUrl: 'https://github.com/example/task-manager',
    liveUrl: '#',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'productivity tool',
  },
  {
    id: '3',
    title: 'Portfolio Website API',
    description: 'This very portfolio website, built with a terminal aesthetic using Next.js and Tailwind CSS, featuring GenAI bio rewriting.',
    technologies: ['Next.js', 'Genkit', 'Tailwind CSS', 'TypeScript'],
    repoUrl: 'https://github.com/example/devterm-portfolio',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'developer portfolio',
  },
];

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="p-0 mb-6">
           <TerminalCommand command="list_projects" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ProjectsSection;
