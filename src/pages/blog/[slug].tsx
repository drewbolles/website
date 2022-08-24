import 'prismjs/themes/prism-okaidia.css';

import * as React from 'react';

import { Col, Row } from '../../components/Grid';
import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa';
import { GetStaticPaths, GetStaticProps } from 'next';

import { ArticleJsonLd } from 'next-seo';
import { Blog } from '../../types/blog';
import Image from 'next/image';
import Jimp from 'jimp';
import Layout from '../../components/Layout/Layout';
import Link from 'next/link';
import Main from '../../components/Layout/Main';
import classNames from 'classnames';
import dayjs from 'dayjs';
import fs from 'fs';
import { importBlogPosts } from '../../utils/content';
import path from 'path';
import sortByDate from '../../utils/sortByDate';

function ShareButton(props: React.ComponentProps<'a'>) {
  return (
    <a
      className="inline-flex h-12 w-12 items-center justify-center text-5xl md:h-6 md:w-6 md:text-2xl"
      {...props}
    />
  );
}

function FooterLink({
  href,
  label,
  title,
  className,
}: {
  href: string;
  label: string;
  title: string;
  className?: string;
}) {
  return (
    <Col className={classNames('flex w-full flex-col md:w-1/2', className)}>
      <span className="font-medium text-gray-600">{label}</span>
      <Link href={href}>
        <a className="text-gray-900">{title}</a>
      </Link>
    </Col>
  );
}

export default function BlogPage({
  html,
  attributes,
  slug,
  nextPost,
  prevPost,
}: Blog & { prevPost: Blog; nextPost: Blog }) {
  const { title, date, description, image, ogImage } = attributes;

  function handleClick(ev: React.MouseEvent) {
    const url = ev.currentTarget.getAttribute('href');
    ev.preventDefault();
    if (url) {
      window.open(url, '', 'width=600,height=300');
    }
  }

  return (
    <>
      <ArticleJsonLd
        url={`https://www.drewbolles.com/blog/${slug}`}
        title={title}
        images={[
          attributes.image
            ? `https://www.drewbolles.com${attributes.image}`
            : '',
        ]}
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
          <div className="container prose prose-sm pb-6 md:prose-lg">
            <h1>{title}</h1>
            {image ? (
              <div className="-mx-6 mb-6 md:-mx-16">
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
              <div className="m-0 text-sm font-medium text-gray-500">
                {date}
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-500">
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
            {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : null}
            <div className="border-t border-gray-200">
              <div className="text-center">
                <h4>If you liked this article please share with others!</h4>
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
              <Row className="pt-8 text-sm">
                {prevPost ? (
                  <FooterLink
                    href={`/blog/${prevPost.slug}`}
                    label="Previous"
                    title={prevPost.attributes.title}
                  />
                ) : null}
                {nextPost ? (
                  <FooterLink
                    href={`/blog/${nextPost.slug}`}
                    label="Next"
                    title={nextPost.attributes.title}
                    className="md:text-right"
                  />
                ) : null}
              </Row>
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

function processImageFileName(file: string) {
  const raw = file.split('.');
  const ext = raw.pop();
  raw.push('1200x630');
  if (ext) {
    raw.push(ext);
  }
  return raw.join('.');
}

async function getOrGenerateOgImage(file: string) {
  const ogImageName = processImageFileName(file);

  if (fs.existsSync(`./public${ogImageName}`)) {
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
  const slug = params?.slug;

  const [blogpost, allPosts] = await Promise.all([
    import(`../../../content/blog/${slug}.md`).catch(() => null),
    importBlogPosts(),
  ]);
  const sortedPosts = allPosts.sort(sortByDate).reverse();
  const currentIndex = sortedPosts.findIndex(post => post.slug === slug);
  const prevPost = currentIndex !== 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex + 1 !== allPosts.length ? sortedPosts[currentIndex + 1] : null;

  const { attributes = {}, html } = blogpost?.default ?? {};

  const date = dayjs(attributes.date).format('MMM DD, YYYY');
  const ogImage = attributes.image
    ? await getOrGenerateOgImage(attributes.image)
    : null;

  return {
    props: {
      attributes: {
        ...attributes,
        ogImage,
        date,
      },
      html,
      slug,
      nextPost,
      prevPost,
    },
  };
};
