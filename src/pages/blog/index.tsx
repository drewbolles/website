import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Layout from '../../components/Layout/Layout';
import Main from '../../components/Layout/Main';
import PageTitle from '../../components/PageTitle';
import { Blog } from '../../types/blog';
import { importBlogPosts } from '../../utils/content';
import sortByDate from '../../utils/sortByDate';

function Post({ attributes, slug }: Blog) {
  const { title, description } = attributes;
  const href = `/blog/${slug}`;
  return (
    <div>
      <h2 className="md:text-2xl mb-2 font-semibold">
        <Link href={href}>
          <a data-testid="post-title" className="hover:text-blue-700">
            {title}
          </a>
        </Link>
      </h2>
      {attributes.image ? (
        <div className="aspect-w-16 aspect-h-9 my-4">
          <Image
            src={attributes.image}
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            alt=""
          />
        </div>
      ) : null}
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className="md:text-lg mb-4"
      />
      <Link href={href}>
        <a className="flex items-center text-blue-700 hover:underline">
          Read <FaArrowRight className="ml-1" />
        </a>
      </Link>
    </div>
  );
}

export default function BlogIndex({
  postsList,
}: {
  postsList: Blog[];
}): JSX.Element {
  return (
    <Layout title="Blog">
      <Main>
        <div className="container max-w-prose">
          <PageTitle>Blog</PageTitle>
          <ul
            data-testid="blog-list"
            className="space-y-6 md:space-y-8 lg:space-y-16"
          >
            {postsList.map(({ attributes, slug }: Blog) => (
              <li key={attributes.title}>
                <Post attributes={attributes} slug={slug} />
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
