'use client';

import cn from 'classnames';
import NextLink from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { IoImagesOutline, IoLogoGithub, IoOpenOutline } from 'react-icons/io5';

import type { Project } from '@/interfaces/project';
import { PROJECTS } from '@/lib/projects';

import { ProjectLightbox, type ProjectLightboxRef } from './project-lightbox';
import Section from './section';

export function Projects() {
  const [project, setProject] = useState<Project | null>(null);
  const lightboxRef = React.useRef<ProjectLightboxRef>(null);

  useEffect(() => {
    if (!project) return;
    lightboxRef.current?.open();
  }, [project]);

  const handleOnWindowClick = useCallback((p: Project) => {
    if (!p.imgs) return;
    setProject(p);
  }, []);

  const handleOnClose = useCallback(() => {
    setProject(null);
  }, []);

  return (
    <Section id='projects' title='PROJECTS.'>
      <div className='flex w-full flex-col gap-4'>
        <span className='italic'>🚀 some side projects, to satisfy my curiosity</span>
        <div className='grid w-full grid-cols-1 gap-4'>
          {PROJECTS.map((p) => (
            <ProjectItem key={p.title} project={p} onWindowClick={handleOnWindowClick} />
          ))}
        </div>
      </div>
      <ProjectLightbox ref={lightboxRef} project={project} onClose={handleOnClose} />
    </Section>
  );
}

export default Projects;

interface ProjectProps {
  project: Project;
  onWindowClick?: (p: Project) => void;
}

const ProjectItem = ({ project, onWindowClick = () => null }: ProjectProps) => {
  return (
    <div className='group flex flex-col gap-2 border border-base-300 bg-base-200 p-4 hover:border-primary'>
      <div id='project__header' className='flex w-full items-center gap-2'>
        <div
          className={cn(
            'flex w-full flex-col items-start justify-between gap-2 font-bold tracking-widest',
            'group-hover:text-primary',
            'md:flex-row',
          )}>
          <span>{project.title}</span>
          {project.stack && project.stack.length > 0 && (
            <span className='font-mono font-normal text-sm tracking-normal'>{project.stack.join(' · ')}</span>
          )}
        </div>
      </div>
      <span className='font-medium italic'>{project.description.short}</span>
      {project.description.long && <span>{project.description.long}</span>}
      <div id='project__links' className='flex gap-2'>
        <span className='font-medium'>links:</span>
        {project.url && (
          <div className='flex [&:last-child>.comma]:hidden'>
            <NextLink
              href={project.url}
              target='_blank'
              className='flex items-center justify-center hover:text-primary hover:underline'>
              <IoOpenOutline size={16} />
              <span className='ml-1'>website</span>
            </NextLink>
            <span className='comma'>,</span>
          </div>
        )}
        {project.github && (
          <div className='flex [&:last-child>.comma]:hidden'>
            <NextLink
              href={project.github}
              target='_blank'
              className='flex items-center justify-center hover:text-primary hover:underline'>
              <IoLogoGithub size={16} />
              <span className='ml-1'>github</span>
            </NextLink>
            <span className='comma'>,</span>
          </div>
        )}
        {project.imgs && (
          <div className='flex [&:last-child>.comma]:hidden'>
            <button
              type='button'
              onClick={() => onWindowClick(project)}
              className='flex items-center justify-center hover:text-primary hover:underline'>
              <IoImagesOutline size={16} />
              <span className='ml-1'>screenshots</span>
            </button>
            <span className='comma'>,</span>
          </div>
        )}
      </div>
    </div>
  );
};
