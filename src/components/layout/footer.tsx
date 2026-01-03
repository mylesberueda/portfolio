import NextLink from 'next/link';
import { IoLogoGithub, IoLogoLinkedin, IoMailOutline } from 'react-icons/io5';
import { SiMastodon } from 'react-icons/si';

import type { Post } from '@/interfaces/post';
import { AUTHOR_FULL_NAME } from '@/lib/author';
import { LINKS } from '@/lib/links';
import { PostPreview } from '@/app/_components/posts/post-preview';

interface FooterProps {
  post: Post;
}

const Footer = ({ post: _ }: FooterProps) => {
  return (
    <>
      <footer className='mt-24 flex justify-center bg-base-200 p-10 text-base-content'>
        <div className='footer max-w-7xl'>
          <nav id='footer__contact'>
            <h6 className='footer-title'>Contact</h6>
            <NextLink href={LINKS.mastodon} target='_blank' className='flex gap-2 hover:text-accent'>
              <SiMastodon size={20} /> <span>Mastodon</span>
            </NextLink>
            <NextLink href={LINKS.linkedin} target='_blank' className='flex gap-2 hover:text-accent'>
              <IoLogoLinkedin size={20} /> <span>Linkedin</span>
            </NextLink>
            <NextLink href={LINKS.email} target='_blank' className='flex gap-2 hover:text-accent'>
              <IoMailOutline size={20} /> <span>Email</span>
            </NextLink>
            <NextLink href={LINKS.portfolio.issues} target='_blank' className='flex gap-2 hover:text-accent'>
              <IoLogoGithub size={20} /> <span>Issues</span>
            </NextLink>
          </nav>
          <div id='footer__portfolio-info'>
            <h6 className='footer-title'>Portfolio Info</h6>
            <p>
              This project was made with&nbsp;
              <NextLink href='https://nextjs.org' target='_blank'>
                Next.js
              </NextLink>
              &nbsp;and is statically generated. The source code is available on&nbsp;
              <NextLink href={LINKS.portfolio.repo} target='_blank'>
                Github
              </NextLink>
              &nbsp;and hosted on&nbsp;
              <NextLink href='https://pages.cloudflare.com/' target='_blank'>
                Cloudflare Pages
              </NextLink>
              . The purpose of the portfolio is to showcase my work. It is meant to serve as an assessment tool for
              potential employers, and for my own personal self-reflection. I'm always looking for ways to improve, so
              feel free to reach out with any feedback. Finally, I usually field calls for potential job opportunities.
              If you think I'd be a good fit for your team or product, don't hesitate to contact me.
            </p>
          </div>
        </div>
      </footer>
      <footer className='flex justify-center border-t bg-base-200 px-10 py-4 text-base-content'>
        <div className='footer max-w-7xl'>
          <aside className='grid-flow-col items-center'>
            <p>&copy; {new Date().getFullYear()} {AUTHOR_FULL_NAME}. All rights reserved.</p>
          </aside>
          <nav className='md:place-self-center md:justify-self-end'>
            <div className='grid grid-flow-col gap-4'>
              <NextLink href={LINKS.mastodon} target='_blank'>
                <SiMastodon size={24} />
              </NextLink>
              <NextLink href={LINKS.github} target='_blank'>
                <IoLogoGithub size={24} />
              </NextLink>
              <NextLink href={LINKS.linkedin} target='_blank'>
                <IoLogoLinkedin size={24} />
              </NextLink>
            </div>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Footer;
