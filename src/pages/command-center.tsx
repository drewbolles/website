import * as React from 'react';
import GithubCard from '../components/CommandCenter/GithubCard';
import TwitterCard from '../components/CommandCenter/TwitterCard';
import { Col, Row } from '../components/Grid';
import Layout from '../components/Layout/Layout';
import PageTitle from '../components/PageTitle';
import SteamCard from '../components/CommandCenter/SteamCard';
import AmazonWishListCard from '../components/CommandCenter/AmazonWishListCard';
import SpotifyCard from '../components/CommandCenter/SpotifyCard';
import BitcoinCard from '../components/CommandCenter/BitcoinCard';

const CommandCol = props => (
  <Col
    className="flex flex-col w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5"
    {...props}
  />
);

export default function CommandCenter(): JSX.Element {
  return (
    <Layout
      title="Command Center"
      description="The command center is a dashboard for my digital footprint"
    >
      <div className="p-6 lg:p-10 flex-grow">
        <PageTitle className="text-center lg:mb-8">Command Center</PageTitle>
        <Row>
          <CommandCol>
            <GithubCard />
          </CommandCol>
          <CommandCol>
            <TwitterCard />
          </CommandCol>
          <CommandCol>
            <SteamCard />
          </CommandCol>
          <CommandCol>
            <AmazonWishListCard />
          </CommandCol>
          <CommandCol>
            <SpotifyCard />
          </CommandCol>
          <CommandCol>
            <BitcoinCard />
          </CommandCol>
        </Row>
      </div>
    </Layout>
  );
}
