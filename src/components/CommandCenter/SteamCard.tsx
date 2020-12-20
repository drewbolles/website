import * as React from 'react';
import { FaSteam } from 'react-icons/fa';
import { MdTimer } from 'react-icons/md';
import { useQuery } from 'react-query';
import AvatarBlock from '../AvatarBlock';
import Card, { CardContent, CardHeader } from '../Card';
import CircularProgress from '../CircularProgress';

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
  const [showAll, setShowAll] = React.useState(false);
  const { status, data: games = [] } = useSteamGames();
  const sortedGames = games
    .filter(game => game.playTime > 0)
    .sort((a, b) => b.playTime - a.playTime);

  const visibleGames = showAll ? sortedGames : sortedGames.slice(0, 5);

  if (status === 'loading') {
    return (
      <div className="py-6">
        <CircularProgress center />
      </div>
    );
  }

  return status === 'success' ? (
    <div className="flex flex-col flex-grow border-gray-200 pt-1 lg:pt-2">
      <ul className="space-y-3 lg:space-y-4">
        {visibleGames.map(game => (
          <li key={game.appID} className="flex items-center">
            <div className="mr-2 flex-none">
              <img
                className="w-8 h-8 rounded"
                src={game.iconURL}
                alt={game.name}
              />
            </div>
            <div className="overflow-hidden">
              <div className="text-sm lg:text-base lg:leading-tight leading-tight mb-1 font-semibold text-gray-700 truncate">
                {game.name}
              </div>
              <div className="flex text-xs leading-tight">
                <MdTimer size="1rem" className="mr-1" />
                <span className="font-bold">
                  {Math.round(game.playTime / 60)} hrs
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {sortedGames.length > 5 ? (
        <footer className="text-center pt-1 mt-auto">
          <button className="text-sm" onClick={() => setShowAll(prev => !prev)}>
            {showAll ? 'Show less' : 'Show all'}
          </button>
        </footer>
      ) : null}
    </div>
  ) : null;
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
