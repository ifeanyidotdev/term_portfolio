import type React from "react";
import ProjectCard, { type Project } from "./ProjectCard";

const projectsData: Project[] = [
  {
    id: "1",
    title: "Blucera",
    description:
      "Blucera is a pioneering digital technology company dedicated to empowering individuals, businesses, and communities and beyond",
    technologies: [
      "Python",
      "Django",
      "Postgres",
      "Redis",
      "Docker",
      "Kafka",
      "AWS",
    ],
    repoUrl: "#",
    liveUrl: "https://www.blucera.com/",
    image:
      "https://www.blucera.com/_next/image?url=%2Fassets%2Fimages%2FhomeWinGPT-Img.png&w=3840&q=75",
    dataAiHint: "Software",
  },
  {
    id: "2",
    title: "Dora",
    description:
      "Dora is a technology company that provides a comprehensive delivery management platform designed to empower logistics businesses and e-commerce operators ",
    image:
      "https://usedora.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdjrjesruj%2Fimage%2Fupload%2Fv1728901685%2FDora%2520Website%2FDora_App_kvnu52.png&w=3840&q=75",
    // image:
    // 	"https://res.cloudinary.com/djrjesruj/image/upload/v1728901685/Dora%20Website/Dora_App_kvnu52.png&w=3840&q=75",
    technologies: ["Flutter", "Firebase"],
    liveUrl: "https://usedora.com/",
    repoUrl: "#",
  },
  {
    id: "3",
    title: "Sorom",
    description:
      "Looking for a fun, easy way to share your hidden travel gems and uncover new adventures around the globe",
    image: "https://framerusercontent.com/images/B7ej9Ddz3op5OJue49SKFyFPo.png",
    technologies: [
      "Flutter",
      "Firebase",
      "Graphql",
      "PostgreSQL",
      "Node.js",
      "Express",
    ],
    liveUrl: "https://www.sorom.co/",
    repoUrl: "#",
  },
  {
    id: "4",
    title: "KaboCash",
    description:
      "KaboCash Technologies is a pioneering fintech company specializing in secure, seamless, and cost-effective cross-border money transfers across Africa and beyond",
    image: "https://www.kabocash.com/send-money-with-kabocash-with-base.webp",
    technologies: ["Flutter", "Firebase", "Node.js", "Socket.io"],
    liveUrl: "https://www.kabocash.com/",
    repoUrl: "#",
  },
];

const ProjectsSectionContent: React.FC = () => {
  return (
    <div className="mt-2">
      <p className="text-foreground mb-3 text-sm md:text-base">
        Listing projects...
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {" "}
        {/* Reduced gap */}
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
export default ProjectsSectionContent;
