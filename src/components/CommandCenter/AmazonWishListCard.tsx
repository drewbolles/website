import * as React from 'react';
import { FaAmazon } from 'react-icons/fa';
import { useQuery } from 'react-query';
import Card, { CardContent, CardHeader } from '../Card';
import RenderQuery from '../RenderQuery';

const useWishList = () =>
  useQuery('amazonWishList', async () => {
    const res = await fetch('/api/wish-list');
    if (!res.ok) {
      throw new Error('Error fetching Amazon wish list');
    }
    return await res.json();
  });

export default function AmazonWishListCard(): JSX.Element {
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
                    <img src={list.picture} />
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
