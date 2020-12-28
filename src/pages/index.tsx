import * as React from 'react';
import Button from '../components/Button';
import { MdEmail, MdOpenInNew } from 'react-icons/md';
import {
  FaArrowRight,
  FaNodeJs,
  FaReact,
  FaRegHandPointDown,
} from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';
import { Row, Col } from '../components/Grid';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import Layout from '../components/Layout/Layout';
import { importBlogPosts, importPortfolioItems } from '../utils/content';
import { Blog } from '../types/blog';
import sortByDate from '../utils/sortByDate';
import { Portfolio } from '../types/portfolio';
import PortfolioImg from '../components/PortfolioImg/PortfolioImg';

const Icon = ({ icon: IconEl }: { icon: React.ElementType }) => (
  <IconEl className="inline mr-1 align-middle" />
);

const Divider = () => (
  <div className="w-12 h-px bg-gray-700 mb-4 bg-opacity-25" />
);

export default function Home({
  postsList,
  featuredPortfolio,
}: {
  postsList: Blog[];
  featuredPortfolio: Portfolio;
}): JSX.Element {
  return (
    <Layout>
      <main className="flex-grow">
        <div className="text-center py-10 lg:py-16">
          <div className="container">
            <h2 className="text-2xl mb-3 md:text-3xl">
              <span className="font-semibold">Software Engineer</span> with over
              a <span className="font-semibold">decade</span> of experience.
            </h2>
            <h3 className="flex flex-col justify-center sm:flex-row text-base md:text-2xl mb-6">
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
                <Button href="mailto:drewbolles@gmail.com">
                  <MdEmail size="1rem" className="mr-2" />
                  <span>Get in touch</span>
                </Button>
              </div>
              <span className="font-xs font-bold mt-3 mb-2 leading-none">
                or
              </span>
              <NextLink href="/resume">
                <a className="underline">View my resume</a>
              </NextLink>
            </div>
          </div>
        </div>
        <div
          className="pt-8 pb-12 md:py-16 bg-cover bg-fixed"
          style={{
            backgroundImage: `url(${require('../images/slice-bg.svg')})`,
          }}
        >
          <div className="container">
            <Row className="items-stretch">
              <Col className="w-full md:w-2/3 lg:w-1/2 flex flex-col justify-center">
                <h3 className="text-2xl font-medium mb-3 flex items-center">
                  Featured Project
                </h3>
                <Divider />
                <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl mb-3">
                  {featuredPortfolio.attributes.title}
                </h2>

                <p
                  className="md:text-2xl mb-4"
                  dangerouslySetInnerHTML={{
                    __html: featuredPortfolio.attributes.description,
                  }}
                />
                <div>
                  <a
                    href={featuredPortfolio.attributes.url}
                    className="text-lg inline-flex pb-1 items-center leading-tight border-b border-dashed border-blue-700 text-blue-700"
                  >
                    <span className="mr-1">View site</span>
                    <MdOpenInNew className="leading-none" />
                  </a>
                </div>
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
        <div className="py-10 md:py-16">
          <div className="container max-w-prose">
            <h2 className="text-2xl font-bold mb-6 lg:mb-10 md:text-3xl lg:text-4xl text-center">
              Recent Blog Posts
            </h2>
            <ul className="space-y-10 md:space-y-12 mb-6">
              {postsList.map(({ attributes, slug }: Blog) => (
                <li key={attributes.title}>
                  <h3 className="text-lg md:text-2xl mb-2 font-semibold">
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
