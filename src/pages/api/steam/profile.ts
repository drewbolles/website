import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { steamClient } from '../../../utils/steam';

const handler: NextApiHandler = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const profile = await steamClient.getUserSummary(
      process.env.NEXT_PUBLIC_STEAM_ID,
    );

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
