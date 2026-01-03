import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostBody } from '@/app/_components/posts/post-body';
import { PostHeader } from '@/app/_components/posts/post-header';
import Alert from '@/components/alert';
import Container from '@/components/container';
import { getAllPosts, getPostBySlug } from '@/lib/api';
import { AUTHOR_FULL_NAME } from '@/lib/author';
import markdownToHtml from '@/lib/markdownToHtml';

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const file = await markdownToHtml(post.content || '');

  return (
    <main>
      <Alert preview={post.preview} />
      <Container>
        <article className='mt-16 mb-32'>
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            readingTime={file.time}
          />
          <PostBody content={file.contents} />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | ${AUTHOR_FULL_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
