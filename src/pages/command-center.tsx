import * as React from 'react';

import { Col, Row } from '../components/Grid';

import AmazonWishListCard from '../components/CommandCenter/AmazonWishListCard';
import GithubCard from '../components/CommandCenter/GithubCard';
import Layout from '../components/Layout/Layout';
import PageTitle from '../components/PageTitle';
import SpotifyCard from '../components/CommandCenter/SpotifyCard';
import SteamCard from '../components/CommandCenter/SteamCard';
import TwitterCard from '../components/CommandCenter/TwitterCard';
import classNames from 'classnames';
import styles from '../styles/command-center.module.css';

function CommandCol(props: React.ComponentProps<'div'>) {
  return (
    <Col
      className={classNames(
        'flex w-full flex-col md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5',
        styles.col,
      )}
      {...props}
    />
  );
}

export default function CommandCenter() {
  return (
    <Layout
      title="Command Center"
      description="The command center is a dashboard for my digital footprint"
    >
      <div className="flex-grow p-6 pb-12 lg:p-10 lg:pb-16">
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
        </Row>
      </div>
    </Layout>
  );
}
