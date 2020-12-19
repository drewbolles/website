import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { steamClient } from '../../../utils/steam';

const handler: NextApiHandler = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const games = await steamClient.getUserOwnedGames(
      process.env.NEXT_PUBLIC_STEAM_ID,
    );
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
