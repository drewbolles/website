import * as React from 'react';
import { FaSteam } from 'react-icons/fa';
import { MdTimer } from 'react-icons/md';
import { useQuery } from 'react-query';
import AvatarBlock from '../AvatarBlock';
import Card, { CardContent, CardHeader } from '../Card';

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

  return status === 'success' ? (
    <div className="border-t-2 border-gray-200 pt-4 -mt-1">
      <ul className="space-y-2">
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
              <div className="text-sm leading-tight mb-1 font-semibold text-gray-700 truncate">
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
        <footer className="text-center pt-1">
          <button className="text-sm" onClick={() => setShowAll(prev => !prev)}>
            {showAll ? 'Show less' : 'Show all'}
          </button>
        </footer>
      ) : null}
    </div>
  ) : null;
}

export default function SteamCard(): JSX.Element {
  const profile = useSteamProfile();

  return (
    <Card>
      <CardHeader icon={FaSteam} title="Steam" />
      <CardContent>
        {profile.status === 'success' ? (
          <AvatarBlock
            href={profile.data.url}
            img={profile.data.avatar.medium}
            primary={profile.data.nickname}
            secondary={profile.data.realName}
            tertiary={profile.data.stateCode}
          />
        ) : null}
        <GamesList />
      </CardContent>
    </Card>
  );
}
