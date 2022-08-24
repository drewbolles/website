import SteamApi from 'steamapi';

export const steamClient = new SteamApi(
  process.env.NEXT_PUBLIC_STEAM_API_KEY as string,
);
