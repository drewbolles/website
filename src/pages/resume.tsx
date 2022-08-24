import * as React from 'react';

import { QueryClient, useQuery } from 'react-query';

import type { GetStaticProps } from 'next';
import Layout from '../components/Layout/Layout';
import Main from '../components/Layout/Main';
import PageTitle from '../components/PageTitle';
import { Resume } from '../types/resume';
import { dehydrate } from 'react-query/hydration';

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

async function fetchResume(): Promise<Resume> {
  const res = await fetch(
    'https://api.github.com/gists/5406b3b998f8596a6bb9a8383568bcb1',
  );
  if (!res.ok) {
    throw new Error('Error fetching resume gist');
  }

  try {
    const raw = await res.json();
    const resumeRaw = raw?.files['resume.json'].content;
    return JSON.parse(resumeRaw);
  } catch (error) {
    throw new Error('Error parsing response');
  }
}

function useResume() {
  return useQuery('resume', fetchResume, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

export default function ResumePage() {
  const { data = {} } = useResume();
  const { basics, work } = data;

  return (
    <Layout title="Resume">
      <Main>
        <div className="container max-w-prose">
          <PageTitle>Resume</PageTitle>
          <div className="mb-6">
            <h2 className="mb-1 text-2xl lg:text-3xl">{basics?.name}</h2>
            <ul className="mb-3">
              <li>
                <a
                  className="text-blue-700 underline"
                  href={`mailto:${basics?.email}`}
                  aria-label="Send me an email"
                >
                  {basics?.email}
                </a>
              </li>
              <li>
                <a
                  href={basics?.url?.toString()}
                  className="text-blue-700 underline"
                >
                  {basics?.url}
                </a>
              </li>
              {(basics?.profiles || []).map(profile => (
                <li key={profile.url?.toString()}>
                  <a
                    href={profile.url?.toString()}
                    className="text-blue-700 underline"
                  >
                    {profile.network}
                  </a>
                </li>
              ))}
            </ul>
            <div className="prose lg:prose-lg">
              <p>{basics?.summary}</p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Experience</h2>
            <ul className="space-y-6" data-testid="experience-list">
              {work?.map((job, idx) => {
                const startDate = job.startDate
                  ? formatDate(new Date(job.startDate))
                  : null;
                const endDateRaw = job.endDate ? new Date(job.endDate) : null;
                const endDate = endDateRaw ? formatDate(endDateRaw) : 'Current';
                return (
                  <li key={`${job.name}-${idx}`}>
                    <div className="md:flex items-center justify-between">
                      <div className="flex items-center">
                        <h3 className="text-xl mb-1 font-medium">
                          {job.url ? (
                            <a
                              href={job.url.toString()}
                              className="hover:text-blue-700"
                            >
                              {job.name}
                            </a>
                          ) : (
                            job.name
                          )}
                        </h3>
                      </div>
                      <div className="flex text-xs sm:text-sm mb-1 md:mb-0 text-gray-700 italic">
                        <div>{startDate}</div>
                        <div className="mx-2">-</div>
                        <div>{endDate || 'Current'}</div>
                      </div>
                    </div>
                    <h3 className="mb-2 font-medium">{job.position}</h3>
                    <p className="text-sm md:w-2/3 text-gray-800">
                      {job.summary}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
          <h2 className="text-2xl font-bold mb-2">References</h2>
          <p>Available upon request</p>
        </div>
      </Main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery('resume', fetchResume);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};
