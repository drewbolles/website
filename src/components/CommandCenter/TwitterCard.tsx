import * as React from 'react';
import { FaTwitter } from 'react-icons/fa';
import Card, { CardContent, CardHeader } from '../Card';

export default function TwitterCard(): JSX.Element {
  return (
    <Card>
      <CardHeader icon={FaTwitter} title="Twitter" />
      <CardContent padding={false}>
        <div className="aspect-w-9 aspect-h-12">
          <div className="overflow-scroll">
            <a
              className="twitter-timeline"
              href="https://twitter.com/bollskis?ref_src=twsrc%5Etfw"
            >
              Tweets by bollskis
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
