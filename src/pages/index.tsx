import * as React from 'react';

import { Col, Row } from '../components/Grid';
import {
  FaArrowRight,
  FaNodeJs,
  FaReact,
  FaRegHandPointDown,
} from 'react-icons/fa';
import { MdEmail, MdOpenInNew } from 'react-icons/md';
import { importBlogPosts, importPortfolioItems } from '../utils/content';

import { Blog } from '../types/blog';
import Button from '../components/Button';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout/Layout';
import NextLink from 'next/link';
import { Portfolio } from '../types/portfolio';
import PortfolioImg from '../components/PortfolioImg/PortfolioImg';
import { SiTypescript } from 'react-icons/si';
import sortByDate from '../utils/sortByDate';

function Icon({ icon: IconEl }: { icon: React.ElementType }) {
  return <IconEl className="mr-1 inline align-middle" />;
}

function Divider() {
  return <div className="mb-4 h-px w-12 bg-gray-700 bg-opacity-25" />;
}

export default function Home({
  postsList,
  featuredPortfolio,
}: {
  postsList: Blog[];
  featuredPortfolio: Portfolio;
}) {
  return (
    <Layout>
      <main className="flex-grow">
        <div className="py-10 text-center lg:py-16">
          <div className="container">
            <h2 className="mb-3 text-2xl md:text-3xl">
              <span className="font-semibold">Software Engineer</span> with over
              a <span className="font-semibold">decade</span> of experience.
            </h2>
            <h3 className="mb-6 flex flex-col justify-center text-base sm:flex-row md:text-2xl">
              <span className="mb-1 sm:mb-0">Currently working with&nbsp;</span>
              <span>
                <Icon icon={FaReact} />
                <strong>React</strong>, <Icon icon={FaNodeJs} />
                <strong>Node</strong>, <Icon icon={SiTypescript} />
                <strong>TypeScript</strong>
              </span>
            </h3>
            <div className="mb-6 text-gray-700">
              <FaRegHandPointDown
                className="inline animate-bounce-slow"
                size="2rem"
              />
            </div>
            <div className="flex flex-col">
              <div>
                <Button href="mailto:contact@drewbolles.com">
                  <MdEmail size="1rem" className="mr-2" />
                  <span>Get in touch</span>
                </Button>
              </div>
              <span className="font-xs mt-3 mb-2 font-bold leading-none">
                or
              </span>
              <NextLink href="/resume">
                <a className="underline hover:text-blue-700">View my resume</a>
              </NextLink>
            </div>
          </div>
        </div>
        <div
          className="bg-cover bg-fixed pt-8 pb-12 md:py-16"
          style={{
            backgroundImage: `url(${require('../images/slice-bg.svg')})`,
          }}
        >
          <div className="container">
            <Row className="items-stretch">
              <Col className="flex w-full flex-col justify-center md:w-2/3 lg:w-1/2">
                <h3 className="mb-3 flex items-center text-2xl font-medium">
                  Featured Project
                </h3>
                <Divider />
                <h2 className="mb-3 text-2xl font-bold md:text-3xl lg:text-4xl">
                  {featuredPortfolio.attributes.title}
                </h2>

                <p
                  className="md:text-2xl"
                  dangerouslySetInnerHTML={{
                    __html: featuredPortfolio.attributes.description,
                  }}
                />

                {featuredPortfolio.attributes.technologies ? (
                  <ul className="mt-4 flex flex-wrap">
                    {featuredPortfolio.attributes.technologies.map(tech => (
                      <li
                        className="mb-2 mr-2 inline-flex h-6 items-center rounded-sm bg-white px-2 text-xs last:mr-0 sm:px-4 sm:text-sm md:h-8"
                        key={tech}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {featuredPortfolio.attributes.url ? (
                  <div className="mt-4">
                    <a
                      href={featuredPortfolio.attributes.url}
                      className="inline-flex items-center border-b border-dashed border-blue-700 pb-1 text-lg leading-tight text-blue-700"
                    >
                      <span className="mr-1">View site</span>
                      <MdOpenInNew className="leading-none" />
                    </a>
                  </div>
                ) : null}
              </Col>
              <Col className="w-full md:w-1/3 lg:w-1/2">
                <PortfolioImg
                  src={featuredPortfolio.attributes.image}
                  alt={`${featuredPortfolio.attributes.title} website`}
                />
              </Col>
            </Row>
          </div>
        </div>
        <div className="py-10 md:py-16 lg:py-20">
          <div className="container max-w-prose">
            <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl lg:mb-10 lg:text-4xl">
              Recent Blog Posts
            </h2>
            <ul className="mb-6 space-y-10 md:space-y-12">
              {postsList.map(({ attributes, slug }: Blog) => (
                <li key={attributes.title}>
                  <h3 className="mb-2 text-lg font-semibold md:text-2xl">
                    <NextLink href={`/blog/${slug}`}>
                      <a className="text-gray-900">{attributes.title}</a>
                    </NextLink>
                  </h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: attributes.description,
                    }}
                    className="mb-3 md:text-lg"
                  />
                  <NextLink href={`/blog/${slug}`}>
                    <a className="flex items-center text-blue-700">
                      Read <FaArrowRight className="ml-1" />
                    </a>
                  </NextLink>
                </li>
              ))}
            </ul>
            <NextLink href="/blog">
              <a className="text-blue-700">View all articles</a>
            </NextLink>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [postsList, portfolioItems] = await Promise.all([
    importBlogPosts(),
    importPortfolioItems(),
  ]);

  return {
    props: {
      postsList: postsList.sort(sortByDate).slice(0, 5),
      featuredPortfolio: portfolioItems
        .sort(sortByDate)
        .find(item => item.attributes.featured),
    },
  };
};
