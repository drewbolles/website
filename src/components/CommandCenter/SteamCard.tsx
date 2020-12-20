import * as React from 'react';
import { FaSteam } from 'react-icons/fa';
import { MdTimer } from 'react-icons/md';
import { useQuery } from 'react-query';
import AvatarBlock from '../AvatarBlock';
import Card, { CardContent, CardHeader } from '../Card';
import RenderQuery from '../RenderQuery';

const useSteamProfile = () =>
  useQuery('steamProfile', async () => {
    const res = await fetch('/api/steam/profile');
    if (!res.ok) {
      throw new Error('Error fectching Steam profile');
    }
    return await res.json();
  });

const useSteamGames = () =>
  useQuery('steamGames', async () => {
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
      <div className="flex flex-col flex-grow border-gray-200 overflow-scroll px-4 -mx-4">
        <ul className="space-y-1">
          {sortedGames.map(game => (
            <li key={game.appID}>
              <a
                href={`https://store.steampowered.com/app/${game.appID}`}
                className="flex items-center hover:bg-gray-100 rounded py-2 px-2 -mx-2"
              >
                <div className="mr-2 flex-none">
                  <img
                    className="w-8 h-8 rounded"
                    src={game.iconURL}
                    alt={game.name}
                  />
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm leading-none mb-1 truncate">
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

export default function SteamCard(): JSX.Element {
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
