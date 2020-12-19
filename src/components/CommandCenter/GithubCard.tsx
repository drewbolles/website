import * as React from 'react';
import { FaGithub } from 'react-icons/fa';
import { useQuery } from 'react-query';
import AvatarBlock from '../AvatarBlock';
import Card, { CardContent, CardHeader } from '../Card';

const StatItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <li className="w-1/3 flex flex-col items-center">
    <span className="text-xs uppercase">{label}</span>
    <span className="text-sm font-semibold">{value}</span>
  </li>
);

const useGitHubUserInfo = () =>
  useQuery('githubUserInfo', async () => {
    const res = await fetch('https://api.github.com/users/drewbolles');
    if (!res.ok) {
      throw new Error('Error while fetching GitHub user info');
    }
    return await res.json();
  });

const useGitHubRepos = () =>
  useQuery('githubRepos', async () => {
    const res = await fetch(
      'https://api.github.com/users/drewbolles/repos?sort=updated',
    );
    if (!res.ok) {
      throw new Error('Error while fetching GitHub user info');
    }
    return await res.json();
  });

export default function GithubCard(): JSX.Element {
  const { data: userData, status: userStatus } = useGitHubUserInfo();
  const { data: reposData = [], status: reposStatus } = useGitHubRepos();

  return (
    <Card>
      <CardHeader icon={FaGithub} title="GitHub" />
      <CardContent>
        <div>
          {userStatus === 'loading' ? <span>Loading...</span> : null}
          {userStatus === 'success' ? (
            <>
              <AvatarBlock
                href={userData.html_url}
                img={userData.avatar_url}
                primary={userData.login}
                secondary={userData.name}
                tertiary={userData.location}
              />
              <ul className="mb-3 flex justify-center">
                <StatItem label="Repos" value={userData.public_repos} />
                <StatItem label="Followers" value={userData.followers} />
                <StatItem label="Following" value={userData.following} />
              </ul>
              <h3 className="font-semibold">Projects:</h3>
            </>
          ) : null}
          {reposStatus === 'success' ? (
            <ul className="text-sm">
              {reposData.slice(0, 5).map(repo => (
                <li key={repo.id}>
                  <div>
                    <a
                      href={repo.html_url}
                      className="border-b border-blue-700 border-dashed text-blue-700 leading-relaxed"
                    >
                      {repo.name}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
