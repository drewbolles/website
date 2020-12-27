import * as React from 'react';
import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout/Layout';
import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa';
import { Blog } from '../../types/blog';
import Main from '../../components/Layout/Main';
import Image from 'next/image';
import { BlogJsonLd } from 'next-seo';
import Jimp from 'jimp';

import 'prismjs/themes/prism-okaidia.css';

const ShareButton = props => (
  <a
    className="inline-flex w-12 h-12 md:w-6 md:h-6 items-center justify-center text-5xl md:text-2xl"
    {...props}
  />
);

export default function BlogPage({
  html,
  attributes,
  slug,
}: Blog): JSX.Element {
  const { title, date, description, image, ogImage } = attributes;

  function handleClick(ev: React.MouseEvent) {
    ev.preventDefault();
    window.open(
      ev.currentTarget.getAttribute('href'),
      '',
      'width=600,height=300',
    );
  }

  return (
    <>
      <BlogJsonLd
        url={`https://www.drewbolles.com/blog/${slug}`}
        title={title}
        images={[
          attributes.image && `https://www.drewbolles.com${attributes.image}`,
        ].filter(Boolean)}
        datePublished={date}
        dateModified={date}
        authorName="Drew Bolles"
        description={description}
      />
      <Layout
        title={title}
        description={description}
        image={ogImage}
        type="article"
      >
        <Main className="flex-grow">
          <div className="container prose prose-sm md:prose-lg pb-6">
            <h1>{title}</h1>
            {image ? (
              <div className="-mx-6 md:-mx-16 mb-6">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <Image
                    src={image}
                    layout="fill"
                    objectPosition="center center"
                    loading="eager"
                    objectFit="cover"
                  />
                </div>
              </div>
            ) : null}
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500 m-0">
                {date}
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">
                  Share Article
                </span>
                <ShareButton
                  href={`http://www.facebook.com/share.php?u=https://www.drewbolles.com/blog/${slug}&t=${title}`}
                  aria-label="Share on Facebook"
                  onClick={handleClick}
                >
                  <FaFacebookSquare size="1em" fill="#4267B2" />
                </ShareButton>
                <ShareButton
                  href={`https://twitter.com/intent/tweet?original_referer=www.drewbolles.com&source=tweetbutton&text=${title}&url=https://www.drewbolles.com/blog/${slug}&via=bollskis`}
                  aria-label="Share on Twitter"
                  onClick={handleClick}
                >
                  <FaTwitterSquare size="1em" fill="#1DA1F2" />
                </ShareButton>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
            <div className="border-t border-gray-200">
              <h4>Share this article</h4>
              <ShareButton
                href={`http://www.facebook.com/share.php?u=https://www.drewbolles.com/blog/${slug}&t=${title}`}
                aria-label="Share on Facebook"
                onClick={handleClick}
              >
                <FaFacebookSquare size="1em" fill="#4267B2" />
              </ShareButton>
              <ShareButton
                href={`https://twitter.com/intent/tweet?original_referer=www.drewbolles.com&source=tweetbutton&text=${title}&url=https://www.drewbolles.com/${slug}&via=bollskis`}
                aria-label="Share on Twitter"
                onClick={handleClick}
              >
                <FaTwitterSquare size="1em" fill="#1DA1F2" />
              </ShareButton>
            </div>
          </div>
        </Main>
      </Layout>
    </>
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

function processImageFileName(file) {
  const raw = file.split('.');
  const ext = raw.pop();
  raw.push('1200x630');
  raw.push(ext);
  return raw.join('.');
}

async function getOrGenerateOgImage(file) {
  const ogImageName = processImageFileName(file);
  const ogImage = await Jimp.read(`./public${ogImageName}`);

  if (ogImage) {
    return ogImageName;
  }

  const image = await Jimp.read(`./public${file}`);
  image.clone();
  image.cover(1200, 630);
  image.quality(75);
  image.write(`./public/${ogImageName}`);

  return ogImageName;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const blogpost = await import(`../../../content/blog/${slug}.md`).catch(
    () => null,
  );

  const { attributes = {}, html } = blogpost?.default ?? {};

  const date = dayjs(attributes.date).format('MMM DD, YYYY');
  const ogImage = attributes.image
    ? await getOrGenerateOgImage(attributes.image)
    : null;

  return {
    props: {
      attributes: {
        ...attributes,
        date,
      },
      ogImage,
      html,
      slug,
    },
  };
};
