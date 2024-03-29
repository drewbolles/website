import * as React from 'react';

import Card, { CardContent, CardHeader } from '../Card';

import AvatarBlock from '../AvatarBlock';
import { FaSteam } from 'react-icons/fa';
import { MdTimer } from 'react-icons/md';
import RenderQuery from '../RenderQuery/RenderQuery';
import SteamAPI from 'steamapi';
import { useQuery } from 'react-query';

const useSteamProfile = () =>
  useQuery('steamProfile', async () => {
    const res = await fetch('/api/steam/profile');
    if (!res.ok) {
      throw new Error('Error fectching Steam profile');
    }
    return await res.json();
  });

const useSteamGames = () =>
  useQuery('steamGames', async (): Promise<SteamAPI.Game[]> => {
    const res = await fetch('/api/steam/games');
    if (!res.ok) {
      throw new Error('Error fectching Steam games');
    }
    return await res.json();
  });

function GamesList() {
  const { status, data: games = [] } = useSteamGames();
  const sortedGames = games
    .filter(game => game.playTime > 0)
    .sort((a, b) => b.playTime - a.playTime);

  return (
    <RenderQuery status={status}>
      <div className="-mx-4 flex flex-grow flex-col overflow-scroll border-gray-200 px-4">
        <ul className="space-y-1">
          {sortedGames.map(game => (
            <li key={game.appID}>
              <a
                href={`https://store.steampowered.com/app/${game.appID}`}
                className="-mx-2 flex items-center rounded py-2 px-2 hover:bg-gray-100"
              >
                <div className="mr-2 flex-none">
                  <img
                    className="rounded"
                    src={game.iconURL}
                    alt={game.name}
                    width="32"
                    height="32"
                  />
                </div>
                <div className="overflow-hidden">
                  <div className="mb-1 truncate text-sm leading-none">
                    {game.name}
                  </div>
                  <div className="flex items-center text-xs leading-tight text-gray-600">
                    <MdTimer size=".75rem" className="mr-1" />
                    <span className="">
                      {Math.round(game.playTime / 60)} hrs
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </RenderQuery>
  );
}

export default function SteamCard() {
  const { data = {}, status } = useSteamProfile();

  return (
    <Card>
      <CardHeader icon={FaSteam} title="Steam" />
      <CardContent>
        <AvatarBlock
          href={data.url}
          img={data.avatar?.medium}
          primary={data.nickname}
          secondary={data.realName}
          tertiary={data.stateCode}
          loading={status === 'loading'}
        />
        <GamesList />
      </CardContent>
    </Card>
  );
}
