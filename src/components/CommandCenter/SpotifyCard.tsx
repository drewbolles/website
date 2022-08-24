import * as React from 'react';

import Card, { CardContent, CardHeader } from '../Card';

import { FaSpotify } from 'react-icons/fa';

export default function SpotifyCard() {
  return (
    <Card>
      <CardHeader icon={FaSpotify} title="Spotify" />
      <CardContent padding={false}>
        <div className="aspect-w-9 aspect-h-12">
          <iframe
            src="https://open.spotify.com/embed/album/15rah8uTv13tEhScI9Nv8z"
            width="300"
            height="380"
            frameBorder="0"
            allow="encrypted-media"
            title="Lil Wayne - No Ceilings Spotify Playlist"
          />
        </div>
      </CardContent>
    </Card>
  );
}
