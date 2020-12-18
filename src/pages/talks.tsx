import { GetStaticProps } from 'next';
import * as React from 'react';
import { MdOpenInNew } from 'react-icons/md';
import Layout from '../components/Layout/Layout';
import Main from '../components/Layout/Main';
import PageTitle from '../components/PageTitle';
import { Event } from '../types/event';
import { Talk } from '../types/talk';
import { importTalks, importEvents } from '../utils/content';
import sortByDate from '../utils/sortByDate';

type Props = {
  talks: Array<Talk & { events: Event[] }>;
};

export default function Talks({ talks }: Props): JSX.Element {
  return (
    <Layout title="My Talks">
      <Main>
        <div className="container max-w-prose">
          <PageTitle>My Talks</PageTitle>
          <ul className="space-y-8 md:space-y-16">
            {talks.map(({ attributes, events }) => (
              <li key={attributes.title}>
                <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">
                  {attributes.title}
                </h2>
                <a
                  href={attributes.slides}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 md:text-lg border-b border-dashed border-blue-700 inline-flex items-center mb-6"
                >
                  View slides <MdOpenInNew className="ml-1" />
                </a>
                <p className="mb-1 text-lg md:text-xl font-medium">
                  Presented at:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  {events.map(event => (
                    <li key={event.slug}>{event.attributes.title}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const talks = await importTalks();
  const events = await importEvents();

  return {
    props: {
      talks: talks.sort(sortByDate).map(talk => ({
        ...talk,
        events: events
          .filter(({ slug }) => talk.attributes.events.includes(slug))
          .sort(sortByDate),
      })),
    }, // will be passed to the page component as props
  };
};
