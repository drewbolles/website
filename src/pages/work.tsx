import { GetStaticProps } from 'next';
import * as React from 'react';
import { Row, Col } from '../components/Grid';
import Layout from '../components/Layout/Layout';
import Main from '../components/Layout/Main';
import PageTitle from '../components/PageTitle';
import { importPortfolioItems } from '../utils/content';
import classNames from 'classnames';
import { MdOpenInNew } from 'react-icons/md';
import { Portfolio } from '../types/portfolio';
import sortByDate from '../utils/sortByDate';

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
          <ul className="space-y-12 md:space-y-16 lg:space-y-24">
            {portfolioItems.map((item, index) => (
              <li key={item.attributes.title}>
                <Row className="items-center">
                  <Col
                    className={classNames('w-full md:w-1/2', {
                      'md:order-2': index % 2 !== 0,
                    })}
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
                      className="md:text-lg mb-4"
                    />
                    {item.attributes.technologies ? (
                      <ul className="flex flex-wrap mb-3 md:mb-4">
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
                    <a
                      href={item.attributes.url}
                      className="text-blue-700 border-b border-dashed inline-flex items-center hover:text-blue-900"
                    >
                      View site <MdOpenInNew className="ml-1" />
                    </a>
                  </Col>
                  <Col
                    className={classNames('w-full md:w-1/2', {
                      'md:order-1': index % 2 !== 0,
                    })}
                  >
                    <div
                      style={{ maxHeight: 500 }}
                      className="overflow-hidden mb-2 shadow rounded"
                    >
                      <img src={item.attributes.image} />
                    </div>
                  </Col>
                </Row>
              </li>
            ))}
          </ul>
        </div>
      </Main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const portfolioItems = await importPortfolioItems();
  const sortedPortfolioItems = portfolioItems.sort(sortByDate);
  return {
    props: {
      portfolioItems: sortedPortfolioItems,
    },
  };
};
