import * as React from 'react';

import { Col, Row } from '../components/Grid';
import { MdEmail, MdOpenInNew } from 'react-icons/md';

import Button from '../components/Button';
import type { GetStaticProps } from 'next';
import Layout from '../components/Layout/Layout';
import Main from '../components/Layout/Main';
import PageTitle from '../components/PageTitle';
import type { Portfolio } from '../types/portfolio';
import PortfolioImg from '../components/PortfolioImg/PortfolioImg';
import classNames from 'classnames';
import { importPortfolioItems } from '../utils/content';
import sortByDate from '../utils/sortByDate';

export default function Work({
  portfolioItems,
}: {
  portfolioItems: Portfolio[];
}) {
  return (
    <Layout title="My Work">
      <Main>
        <div className="container">
          <PageTitle>My Work</PageTitle>
          <ul
            data-testid="portfolio-list"
            className="mb-12 space-y-12 md:mb-16 md:space-y-16 lg:space-y-32"
          >
            {portfolioItems.map((item, index) => {
              return (
                <li key={item.attributes.title}>
                  <Row className="items-stretch lg:-mx-8">
                    <Col
                      className={classNames(
                        'flex w-full flex-col justify-center md:w-1/2 lg:px-8',
                        {
                          'md:order-2': index % 2 !== 0,
                        },
                      )}
                    >
                      <h2 className="mb-2 text-xl font-semibold sm:text-2xl md:text-3xl">
                        {item.attributes.title}
                      </h2>
                      {item.attributes.role ? (
                        <h3 className="mb-2 sm:text-lg md:text-2xl">
                          <span className="font-semibold">Role:</span>{' '}
                          {item.attributes.role}
                        </h3>
                      ) : null}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.attributes.description,
                        }}
                        className="mb-4 max-w-prose md:text-lg"
                      />
                      {item.attributes.technologies ? (
                        <ul className="mb-3 flex flex-wrap">
                          {item.attributes.technologies.map(tech => (
                            <li
                              className="mb-2 mr-2 inline-flex h-6 items-center rounded-sm bg-blue-50 px-2 text-xs last:mr-0 sm:px-4 sm:text-sm md:h-8"
                              key={tech}
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {item.attributes.url ? (
                        <div>
                          <a
                            href={item.attributes.url}
                            className="inline-flex items-center border-b border-dashed text-sm text-blue-700 hover:text-blue-900 sm:text-base md:text-lg"
                          >
                            View site <MdOpenInNew className="ml-1" />
                          </a>
                        </div>
                      ) : null}
                    </Col>
                    <Col
                      className={classNames('w-full md:w-1/2 lg:px-8 ', {
                        'md:order-1': index % 2 !== 0,
                      })}
                    >
                      <PortfolioImg src={item.attributes.image} />
                    </Col>
                  </Row>
                </li>
              );
            })}
          </ul>
          <div className="py-8 text-center md:py-12 lg:py-16">
            <h3 className="mb-3 text-xl font-bold sm:text-2xl md:mb-6 md:text-3xl">
              Interested in working with me?
            </h3>
            <Button href="mailto:contact@drewbolles.com">
              <MdEmail className="mr-1" />
              Send me an email
            </Button>
          </div>
        </div>
      </Main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const portfolioItems = await importPortfolioItems();

  return {
    props: {
      portfolioItems: portfolioItems.sort(sortByDate),
    },
  };
};
