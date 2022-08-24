import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { steamClient } from '../../../utils/steam';

const handler: NextApiHandler = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const steamId = process.env.NEXT_PUBLIC_STEAM_ID;
    if (!steamId) {
      throw new Error('Error: Missing steam id');
    }
    const games = await steamClient.getUserOwnedGames(steamId);
    res.status(200).json(games);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default handler;
