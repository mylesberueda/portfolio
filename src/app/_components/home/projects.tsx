'use client';

import cn from 'classnames';
import NextLink from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { IoLogoGithub, IoOpenOutline } from 'react-icons/io5';
import { TfiWindow } from 'react-icons/tfi';

import { Modal, type ModalRef } from '@/components';
import type { Project } from '@/interfaces/project';
import { PROJECTS } from '@/lib/projects';

import Section from './section';

export function Projects() {
  const [project, setProject] = useState<Project | null>(null);
  const [component, setComponent] = useState<React.ReactNode>();
  const modalRef = React.useRef<ModalRef>(null);

  useEffect(() => {
    if (!project) return;

    modalRef.current?.openModal();
  }, [project]);

  const handleOnWindowClick = useCallback((p: Project) => {
    if (!p.imgs) return;
    const images = p.imgs || [];

    const url = p.title.toLowerCase().replace(/\s/g, '-');

    const C = () => (
      <div className='flex max-h-[80%] flex-col gap-4'>
        <h3 className='font-medium text-xl'>{p.title}</h3>
        {p.description.long && <p>{p.description.long}</p>}
        <div className='carousel w-full border bg-base-300' style={{ aspectRatio: '16 / 9', maxHeight: '70vh' }}>
          {images.map((img, i) => {
            return (
              <div key={`${url}-${i + 1}`} id={`${url}-slide-${i}`} className='carousel-item relative w-full'>
                <img alt={`${url}-img-${i}`} src={img} className='h-full w-full object-contain' />
                <div className='-translate-y-1/2 absolute top-1/2 right-5 left-5 flex transform justify-between'>
                  {images.length > 1 && (
                    <>
                      <a
                        href={`#${url}-slide-${i === 0 ? images.length - 1 : i - 1}`}
                        className='btn btn-circle opacity-70'>
                        ❮
                      </a>
                      <a
                        href={`#${url}-slide-${i === images.length - 1 ? 0 : i + 1}`}
                        className='btn btn-circle opacity-70'>
                        ❯
                      </a>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );

    setComponent(<C />);
    modalRef.current?.openModal();
  }, []);

  const handleOnClose = useCallback(() => {
    console.log('closed');
    setProject(null);
  }, []);

  return (
    <Section id='projects' title='PROJECTS.'>
      <div className='flex w-full flex-col gap-4'>
        <span className='italic'>🚀 some side projects, to satisfy my curiosity</span>
        <div className='grid grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2'>
          {PROJECTS.map((project) => (
            <ProjectItem key={project.title} project={project} onWindowClick={handleOnWindowClick} />
          ))}
        </div>
      </div>
      <Modal id='project' ref={modalRef} onClose={handleOnClose}>
        {component}
      </Modal>
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
    <div
      className={cn(
        'group flex flex-row justify-between p-4 align-center md:odd:last:col-span-2',
        'border bg-base-200 p-4 hover:border-primary',
        'dark:hover:border-secondary',
      )}>
      <div className='select-none'>
        <h2 className='font-medium text-xl group-hover:text-primary dark:group-hover:text-secondary'>
          {project.title}
        </h2>
        <p className='line-clamp-3'>{project.description.short}</p>
      </div>
      <div className='flex items-start gap-1'>
        {project.github && (
          <NextLink href={project.github} target='_blank'>
            <button type='button' className='p-1 hover:text-primary dark:hover:text-secondary'>
              <IoLogoGithub size={24} />
            </button>
          </NextLink>
        )}
        {project.url && (
          <NextLink href={project.url} target='_blank'>
            <button type='button' className='p-1 hover:text-primary dark:hover:text-secondary'>
              <IoOpenOutline size={24} />
            </button>
          </NextLink>
        )}
        {project.imgs && (
          <button
            type='button'
            className='p-1 hover:text-primary dark:hover:text-secondary'
            onClick={() => onWindowClick(project)}>
            <TfiWindow size={24} />
          </button>
        )}
      </div>
    </div>
  );
};
