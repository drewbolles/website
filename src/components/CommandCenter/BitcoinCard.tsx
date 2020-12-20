import * as React from 'react';
import { FaBitcoin } from 'react-icons/fa';
import { useQuery } from 'react-query';
import Card, { CardContent, CardHeader } from '../Card';
import CircularProgress from '../CircularProgress';

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

export default function BitcoinCard(): JSX.Element {
  const { data, status } = useBitcoinPrice();
  return (
    <Card>
      <CardHeader icon={FaBitcoin} title="Bitcoin" />
      <CardContent>
        {status === 'loading' ? <CircularProgress center /> : null}
        {status === 'success' ? (
          <h3 className="text-2xl py-6 pb-10 lg:py-12 lg:pb-14 text-center">
            <span dangerouslySetInnerHTML={{ __html: data.bpi.USD.symbol }} />
            {data.bpi.USD.rate}
          </h3>
        ) : null}
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
