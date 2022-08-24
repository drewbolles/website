import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { steamClient } from '../../../utils/steam';

const handler: NextApiHandler = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const steamId = process.env.NEXT_PUBLIC_STEAM_ID;
    if (!steamId) {
      throw new Error('Error: missing steam id');
    }

    const profile = await steamClient.getUserSummary(steamId);

    res.status(200).json(profile);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default handler;
