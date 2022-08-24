import * as React from 'react';

import type { Blog } from '../../types/blog';
import { FaArrowRight } from 'react-icons/fa';
import type { GetStaticProps } from 'next';
import Image from 'next/image';
import Layout from '../../components/Layout/Layout';
import Link from 'next/link';
import Main from '../../components/Layout/Main';
import PageTitle from '../../components/PageTitle';
import { importBlogPosts } from '../../utils/content';
import sortByDate from '../../utils/sortByDate';

function Post({
  attributes,
  slug,
  imageLoading = 'lazy',
}: Blog & { imageLoading?: 'lazy' | 'eager' }) {
  const { title, description } = attributes;
  const href = `/blog/${slug}`;
  return (
    <div>
      <h2 className="mb-2 font-semibold md:text-2xl">
        <Link href={href}>
          <a data-testid="post-title" className="hover:text-blue-700">
            {title}
          </a>
        </Link>
      </h2>
      {attributes.image ? (
        <div className="aspect-w-16 aspect-h-9 my-3 md:my-4">
          <Image
            src={attributes.image}
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            loading={imageLoading}
            alt=""
          />
        </div>
      ) : null}
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className="mb-3 md:text-lg"
      />
      <Link href={href}>
        <a className="flex items-center text-sm text-blue-700 hover:underline md:text-base">
          Read <FaArrowRight className="ml-1" />
        </a>
      </Link>
    </div>
  );
}

export default function BlogIndex({ postsList }: { postsList: Blog[] }) {
  return (
    <Layout title="Blog">
      <Main>
        <div className="container max-w-prose">
          <PageTitle>Blog</PageTitle>
          <div className="prose mb-6 md:prose-lg">
            <p>
              I mostly blog about technical topics that are relevant to me at
              the time. If you would like to stay up-to-date with my content,
              feel free to <a href="/rss.xml">subscribe to my RSS feed</a> or{' '}
              <a
                href="https://www.twitter.com/bollskis"
                target="_blank"
                rel="noopener noreferrer"
              >
                follow me on twitter
              </a>
              .
            </p>
          </div>
          <div className="mb-6 h-px bg-gray-200"></div>
          <ul data-testid="blog-list" className="space-y-10 lg:space-y-16">
            {postsList.map(({ attributes, slug }: Blog, index) => (
              <li key={attributes.title}>
                <Post
                  attributes={attributes}
                  slug={slug}
                  imageLoading={index === 0 ? 'eager' : 'lazy'}
                />
              </li>
            ))}
          </ul>
        </div>
      </Main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postsList = await importBlogPosts();

  return {
    props: {
      postsList: postsList.sort(sortByDate),
    },
  };
};
