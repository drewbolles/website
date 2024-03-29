import * as React from 'react';

import Card, { CardContent, CardHeader } from '../Card';

import AvatarBlock from '../AvatarBlock';
import type { Endpoints } from '@octokit/types';
import { FaGithub } from 'react-icons/fa';
import RenderQuery from '../RenderQuery/RenderQuery';
import { useQuery } from 'react-query';

const StatItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <li className="flex w-1/3 flex-col items-center">
    <span className="text-xs uppercase">{label}</span>
    <span className="text-sm font-semibold">{value}</span>
  </li>
);

const useGitHubUserInfo = () =>
  useQuery(
    'githubUserInfo',
    async (): Promise<
      Endpoints['GET /users/{username}']['response']['data']
    > => {
      const res = await fetch('https://api.github.com/users/drewbolles');
      if (!res.ok) {
        throw new Error('Error while fetching GitHub user info');
      }
      return await res.json();
    },
  );

const useGitHubRepos = () =>
  useQuery(
    'githubRepos',
    async (): Promise<
      Endpoints['GET /users/{username}/repos']['response']['data']
    > => {
      const res = await fetch(
        'https://api.github.com/users/drewbolles/repos?sort=updated',
      );
      if (!res.ok) {
        throw new Error('Error while fetching GitHub user info');
      }
      return await res.json();
    },
  );

function GitHubRepos() {
  const { data, status } = useGitHubRepos();

  return (
    <RenderQuery status={status}>
      <h3 className="font-semibold lg:text-lg">Projects:</h3>
      <ul className="text-sm lg:text-base">
        {data?.slice(0, 5).map(repo => (
          <li key={repo.id}>
            <div>
              <a
                href={repo.html_url}
                className="border-b border-dashed border-blue-700 leading-relaxed text-blue-700"
              >
                {repo.name}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </RenderQuery>
  );
}

export default function GithubCard() {
  const { data: userData, status: userStatus } = useGitHubUserInfo();

  return (
    <Card>
      <CardHeader icon={FaGithub} title="GitHub" />
      <CardContent>
        <AvatarBlock
          href={userData?.html_url}
          img={userData?.avatar_url}
          primary={userData?.login}
          secondary={userData?.name}
          tertiary={userData?.location}
          loading={userStatus === 'loading'}
        />
        <RenderQuery status={userStatus}>
          <ul className="mb-3 flex justify-center lg:mb-6 lg:pt-2">
            {userData?.public_repos ? (
              <StatItem label="Repos" value={userData.public_repos} />
            ) : null}
            {userData?.followers ? (
              <StatItem label="Followers" value={userData.followers} />
            ) : null}
            {userData?.following ? (
              <StatItem label="Following" value={userData.following} />
            ) : null}
          </ul>
        </RenderQuery>

        <GitHubRepos />
      </CardContent>
    </Card>
  );
}
