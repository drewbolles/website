import * as React from 'react';
import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout/Layout';
import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa';
import { Blog } from '../../types/blog';

const ShareButton = props => (
  <a className="inline-flex w-6 h-6 items-center justify-center" {...props} />
);

export default function BlogPage({
  html,
  attributes,
  slug,
}: Blog): JSX.Element {
  const { title, date, description } = attributes;
  function handleClick(ev: React.MouseEvent) {
    ev.preventDefault();
    window.open(
      ev.currentTarget.getAttribute('href'),
      '',
      'width=600,height=300',
    );
  }

  return (
    <Layout title={title} description={description}>
      <main className="flex-grow">
        <div className="container prose prose-sm md:prose-lg pt-6 md:pt-12 pb-6">
          <h1>{title}</h1>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500 m-0">{date}</div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Share Article</span>
              <ShareButton
                href={`http://www.facebook.com/share.php?u=https://www.drewbolles.com/blog/${slug}&t=${title}`}
                aria-label="Share on Facebook"
                onClick={handleClick}
              >
                <FaFacebookSquare size="1.5rem" fill="#4267B2" />
              </ShareButton>
              <ShareButton
                href={`https://twitter.com/intent/tweet?original_referer=www.drewbolles.com&source=tweetbutton&text=${title}&url=https://www.drewbolles.com/${slug}&via=bollskis`}
                aria-label="Share on Twitter"
                onClick={handleClick}
              >
                <FaTwitterSquare size="1.5rem" fill="#1DA1F2" />
              </ShareButton>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fs
    .readdirSync(path.join(process.cwd(), 'content/blog'))
    .map(blogName => {
      const trimmedName = blogName.substring(0, blogName.length - 3);
      return {
        params: { slug: trimmedName },
      };
    });

  return {
    paths,
    fallback: false, // constrols whether not predefined paths should be processed on demand, check for more info: https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const blogpost = await import(`../../../content/blog/${slug}.md`).catch(
    () => null,
  );

  const { attributes = {}, html } = blogpost?.default ?? {};

  attributes.date = dayjs(attributes.date).format('MMM DD, YYYY');

  return {
    props: {
      attributes,
      html,
      slug,
    },
  };
};
