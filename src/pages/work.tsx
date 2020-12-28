import { GetStaticProps } from 'next';
import * as React from 'react';
import { Row, Col } from '../components/Grid';
import Layout from '../components/Layout/Layout';
import Main from '../components/Layout/Main';
import PageTitle from '../components/PageTitle';
import { importPortfolioItems } from '../utils/content';
import classNames from 'classnames';
import { MdEmail, MdOpenInNew } from 'react-icons/md';
import { Portfolio } from '../types/portfolio';
import sortByDate from '../utils/sortByDate';
import PortfolioImg from '../components/PortfolioImg/PortfolioImg';
import Button from '../components/Button';

export default function Work({
  portfolioItems,
}: {
  portfolioItems: Portfolio[];
}): JSX.Element {
  return (
    <Layout title="My Work">
      <Main>
        <div className="container">
          <PageTitle>My Work</PageTitle>
          <ul
            data-testid="portfolio-list"
            className="space-y-12 md:space-y-16 lg:space-y-32 mb-12 md:mb-16"
          >
            {portfolioItems.map((item, index) => {
              return (
                <li key={item.attributes.title}>
                  <Row className="items-stretch lg:-mx-8">
                    <Col
                      className={classNames(
                        'w-full md:w-1/2 lg:px-8 flex flex-col justify-center',
                        {
                          'md:order-2': index % 2 !== 0,
                        },
                      )}
                    >
                      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                        {item.attributes.title}
                      </h2>
                      {item.attributes.role ? (
                        <h3 className="text-lg md:text-2xl mb-2">
                          <span className="font-semibold">Role:</span>{' '}
                          {item.attributes.role}
                        </h3>
                      ) : null}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.attributes.description,
                        }}
                        className="md:text-lg mb-4 max-w-prose"
                      />
                      {item.attributes.technologies ? (
                        <ul className="flex flex-wrap mb-3">
                          {item.attributes.technologies.map(tech => (
                            <li
                              className="inline-flex items-center rounded-sm h-6 md:h-8 px-4 text-sm mb-2 mr-2 last:mr-0 bg-blue-50"
                              key={tech}
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      <div>
                        <a
                          href={item.attributes.url}
                          className="text-blue-700 md:text-lg border-b border-dashed inline-flex items-center hover:text-blue-900"
                        >
                          View site <MdOpenInNew className="ml-1" />
                        </a>
                      </div>
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
          <div className="py-8 md:py-12 lg:py-16 text-center">
            <h3 className="text-2xl font-bold md:text-3xl mb-3 md:mb-6">
              Interested in working with me?
            </h3>
            <Button href="mailto:drewbolles@gmail.com">
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
