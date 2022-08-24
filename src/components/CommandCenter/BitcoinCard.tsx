import * as React from 'react';

import Card, { CardContent, CardHeader } from '../Card';

import { FaBitcoin } from 'react-icons/fa';
import RenderQuery from '../RenderQuery/RenderQuery';
import { useQuery } from 'react-query';

const useBitcoinPrice = () =>
  useQuery(
    'bitcoinPrice',
    async () => {
      const res = await fetch(
        'https://api.coindesk.com/v1/bpi/currentprice.json',
      );
      if (!res.ok) {
        throw new Error('Error while fetching bitcoin price');
      }
      return await res.json();
    },
    {
      refetchInterval: 5000,
    },
  );

export default function BitcoinCard() {
  const { data, status } = useBitcoinPrice();
  return (
    <Card>
      <CardHeader icon={FaBitcoin} title="Bitcoin" />
      <CardContent>
        <RenderQuery status={status}>
          <h3 className="py-6 pb-10 text-center text-2xl lg:py-12 lg:pb-14">
            <span dangerouslySetInnerHTML={{ __html: data.bpi.USD.symbol }} />
            {data.bpi.USD.rate}
          </h3>
        </RenderQuery>
        <p className="text-xs text-gray-700">
          Price provided by{' '}
          <a
            href="https://www.coindesk.com/coindesk-api"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Coindesk
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
