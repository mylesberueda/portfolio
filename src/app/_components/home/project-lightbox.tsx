'use client';

import { useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import React from 'react';
import { IoClose } from 'react-icons/io5';

import type { Project } from '@/interfaces/project';

export interface ProjectLightboxRef {
  open: () => void;
  close: () => void;
}

interface ProjectLightboxProps {
  project: Project | null;
  onClose?: () => void;
}

export const ProjectLightbox = React.forwardRef<ProjectLightboxRef, ProjectLightboxProps>(
  ({ project, onClose = () => null }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => dialogRef.current?.showModal(),
      close: () => dialogRef.current?.close(),
    }));

    const handleClose = useCallback(() => {
      onClose();
    }, [onClose]);

    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const handleBackdropClick = (e: MouseEvent) => {
        if (e.target === dialog) dialog.close();
      };
      dialog.addEventListener('click', handleBackdropClick);
      return () => dialog.removeEventListener('click', handleBackdropClick);
    }, []);

    if (!project?.imgs?.length) return <dialog ref={dialogRef} onClose={handleClose} className='hidden' />;

    const slug = project.title.toLowerCase().replace(/\s/g, '-');
    const images = project.imgs;

    return (
      <dialog
        ref={dialogRef}
        onClose={handleClose}
        className={
          'm-auto h-[min(90vh,1000px)] w-[min(95vw,1600px)] border-0 bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-md'
        }>
        <button
          type='button'
          onClick={() => dialogRef.current?.close()}
          className='absolute top-2 right-2 z-10 flex items-center justify-center bg-black/40 p-2 text-white hover:text-primary'
          aria-label='close'>
          <IoClose size={24} />
        </button>
        <div className='carousel h-full w-full'>
          {images.map((img, i) => (
            <div
              key={`${slug}-slide-${i + 1}`}
              id={`${slug}-slide-${i}`}
              className='carousel-item relative h-full w-full items-center justify-center'>
              <img alt={`${slug}-img-${i}`} src={img} className='max-h-full max-w-full object-contain' />
              {images.length > 1 && (
                <div className='-translate-y-1/2 absolute top-1/2 right-5 left-5 flex transform justify-between'>
                  <a
                    href={`#${slug}-slide-${i === 0 ? images.length - 1 : i - 1}`}
                    className='btn btn-circle bg-black/40 text-white opacity-70 hover:opacity-100'>
                    ❮
                  </a>
                  <a
                    href={`#${slug}-slide-${i === images.length - 1 ? 0 : i + 1}`}
                    className='btn btn-circle bg-black/40 text-white opacity-70 hover:opacity-100'>
                    ❯
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </dialog>
    );
  },
);

ProjectLightbox.displayName = 'ProjectLightbox';

export default ProjectLightbox;
