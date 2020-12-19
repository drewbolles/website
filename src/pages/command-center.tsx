import * as React from 'react';
import GithubCard from '../components/CommandCenter/GithubCard';
import TwitterCard from '../components/CommandCenter/TwitterCard';
import { Col, Row } from '../components/Grid';
import Layout from '../components/Layout/Layout';
import PageTitle from '../components/PageTitle';
import SteamCard from '../components/CommandCenter/SteamCard';

const CommandCol = props => (
  <Col className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5" {...props} />
);

export default function CommandCenter(): JSX.Element {
  return (
    <Layout
      title="Command Center"
      description="The command center is a dashboard for my digital footprint"
    >
      <div className="p-6 flex-grow">
        <PageTitle>Command Center</PageTitle>
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
        </Row>
      </div>
    </Layout>
  );
}
