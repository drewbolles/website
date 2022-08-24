import * as React from 'react';

import Card, { CardContent, CardHeader } from '../Card';

import { FaAmazon } from 'react-icons/fa';
import RenderQuery from '../RenderQuery/RenderQuery';
import { useQuery } from 'react-query';

type AmazonWishList = {
  num: number;
  name: string;
  link: string;
  'old-price': string;
  'new-price': string;
  'date-added': string;
  priority: string;
  rating: string;
  'total-ratings': string;
  comment: string;
  picture: string;
  page: number;
}[];

const useWishList = () =>
  useQuery('amazonWishList', async (): Promise<AmazonWishList> => {
    const res = await fetch('/api/wish-list');
    if (!res.ok) {
      throw new Error('Error fetching Amazon wish list');
    }
    return await res.json();
  });

export default function AmazonWishListCard() {
  const { data: wishList = [], status } = useWishList();

  return (
    <Card>
      <CardHeader icon={FaAmazon} title="Wish List" />
      <CardContent>
        <RenderQuery status={status}>
          <ul className="divide-y-2 space-y-3">
            {wishList.map(list => (
              <li key={list.link} className="pt-3 first:pt-0">
                <a
                  href={list.link}
                  className="flex hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-16 flex-none mr-4">
                    <img src={list.picture} alt={list.name} width="64" />
                  </div>
                  <div>
                    <h3 className="line-clamp leading-tight mb-1">
                      {list.name}
                    </h3>
                    <div
                      className="text-sm text-gray-600"
                      dangerouslySetInnerHTML={{ __html: list['new-price'] }}
                    />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </RenderQuery>
      </CardContent>
    </Card>
  );
}
