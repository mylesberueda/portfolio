import NextLink from 'next/link';
import { useMemo } from 'react';

import { EDUCATION, WORK_EXPERIENCE } from '@/lib/resume';
import { SKILLS } from './skills';

import { ResumeEducation, ResumeSkill, ResumeWorkExperience } from './_components';
import Section from './section';

export function Resume() {
  const experienceSubtitle = useMemo(() => {
    const random = new Date().getMinutes() % 2 === 0;
    if (random) {
      return (
        <>
          This list is incomplete; you can help by&nbsp;
          <NextLink href='#links' className='text-secondary underline'>
            contacting me
          </NextLink>
        </>
      );
    }

    return 'My career, so far';
  }, []);

  return (
    <Section id='resume' title='RESUME.'>
      <div className='flex w-full flex-col gap-4'>
        <span className='italic'>🎫 my experiences - condensed</span>
        <div className='flex flex-col gap-8'>
          <div id='resume__work-experience' className='flex w-full flex-col gap-4'>
            <div className='flex flex-col'>
              <h2 className='font-bold text-4xl'>WORK EXPERIENCE</h2>
              <span className='italic'>{experienceSubtitle}</span>
            </div>
            <div className='grid w-full grid-cols-1 gap-4'>
              {WORK_EXPERIENCE.map((experience) => (
                <ResumeWorkExperience key={experience.company} experience={experience} />
              ))}
            </div>
          </div>
          <div id='resume__education' className='flex w-full flex-col gap-4'>
            <div className='flex flex-col'>
              <h2 className='font-bold text-4xl'>EDUCATION</h2>
              <span className='italic'>the formal education that i've completed</span>
            </div>
            <div className='grid w-full grid-cols-1 gap-4'>
              {EDUCATION.map((education) => (
                <ResumeEducation key={education.school} education={education} />
              ))}
            </div>
          </div>
          <div id='resume__skills' className='flex w-full flex-col gap-4'>
            <div className='flex flex-col'>
              <h2 className='font-bold text-4xl'>SKILLS</h2>
              <span className='italic'>
                a non-exclusive list of tech that i've used both professionally and personally
              </span>
            </div>
            <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {SKILLS.map((skill) => (
                <ResumeSkill key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Resume;
