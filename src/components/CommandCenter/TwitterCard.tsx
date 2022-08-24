import * as React from 'react';

import Card, { CardContent, CardHeader } from '../Card';

import CircularProgress from '../CircularProgress';
import { FaTwitter } from 'react-icons/fa';

export default function TwitterCard() {
  return (
    <Card>
      <CardHeader icon={FaTwitter} title="Twitter" />
      <CardContent padding={false}>
        <div className="aspect-w-9 aspect-h-12">
          <div className="overflow-scroll">
            <a
              className="twitter-timeline flex h-full"
              href="https://twitter.com/bollskis?ref_src=twsrc%5Etfw"
            >
              <CircularProgress center />
            </a>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charSet="utf-8"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
