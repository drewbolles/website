import * as React from 'react';

import { FaEnvelope, FaLink, FaLinkedin } from 'react-icons/fa';
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
          <div className="mb-6 md:mb-8">
            <h2 className="mb-4 text-2xl lg:text-3xl">{basics?.name}</h2>
            <ul className="mb-4 flex flex-col space-y-3 leading-none sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3 ">
              <li>
                <a
                  className="flex items-center text-blue-700"
                  href={`mailto:${basics?.email}`}
                  aria-label="Send me an email"
                >
                  <FaEnvelope />
                  <span className="ml-2">{basics?.email}</span>
                </a>
              </li>
              <li className="hidden sm:block">/</li>
              <li>
                <a
                  href={basics?.url?.toString()}
                  className="flex items-center text-blue-700"
                >
                  <FaLink />
                  <span className="ml-2">{basics?.url}</span>
                </a>
              </li>
              <li className="hidden sm:block">/</li>
              {(basics?.profiles || []).map(profile => (
                <li key={profile.url?.toString()}>
                  <a
                    href={profile.url?.toString()}
                    className="flex items-center text-blue-700"
                  >
                    <FaLinkedin />
                    <span className="ml-2">{profile.network}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="text-gray-700 md:text-lg">
              <p>{basics?.summary}</p>
            </div>
          </div>
          <div className="mb-6 md:mb-8">
            <h2 className="mb-4 text-2xl font-bold md:mb-6">Experience</h2>
            <ul className="divide-y" data-testid="experience-list">
              {work?.map((job, idx) => {
                const startDate = job.startDate
                  ? formatDate(new Date(job.startDate))
                  : null;
                const endDateRaw = job.endDate ? new Date(job.endDate) : null;
                const endDate = endDateRaw ? formatDate(endDateRaw) : 'Current';
                return (
                  <li
                    key={`${job.name}-${idx}`}
                    className="py-6 first:pt-0 last:pb-0 md:py-8"
                  >
                    <div className="items-center justify-between md:flex">
                      <div className="mb-2 flex items-center">
                        <h3 className="text-xl font-semibold">
                          {job.url ? (
                            <a
                              href={job.url.toString()}
                              className="text-blue-700 hover:underline"
                            >
                              {job.name}
                            </a>
                          ) : (
                            job.name
                          )}
                        </h3>
                      </div>
                      <div className="mb-1 flex text-xs italic text-gray-700 sm:text-sm md:mb-0">
                        <div>{startDate}</div>
                        <div className="mx-2">-</div>
                        <div>{endDate || 'Current'}</div>
                      </div>
                    </div>
                    <h3 className="mb-1 text-lg font-medium text-gray-700">
                      {job.position}
                    </h3>
                    <p className="text-gray-600">{job.summary}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <h2 className="mb-2 text-2xl font-bold">References</h2>
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
      revalidate: 60 * 60,
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};
