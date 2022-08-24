import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const handler: NextApiHandler = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const response = await fetch(
      `https://www.justinscarpetti.com/projects/amazon-wish-lister/api/?id=${process.env.NEXT_PUBLIC_AMZN_WISH_LIST_ID}`,
    );
    const wishList = await response.json();
    res.status(200).json(wishList);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default handler;
