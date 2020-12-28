import * as React from 'react';
import Layout from '../components/Layout/Layout';
import Main from '../components/Layout/Main';
import PageTitle from '../components/PageTitle';

export default function PrivacyPolicy(): JSX.Element {
  return (
    <Layout title="Privacy Policy">
      <Main>
        <div className="container max-w-prose">
          <PageTitle>Privacy Policy</PageTitle>
          <div className="prose">
            <h2>Information that is gathered from visitors</h2>
            <p>
              In common with other websites, log files are stored on the web
              server saving details such as the visitor&apos;s IP address,
              browser type, referring page and time of visit.
            </p>

            <p>
              Cookies may be used to remember visitor preferences when
              interacting with the website.
            </p>

            <p>
              Where registration is required, the visitor&apos;s email and a
              username will be stored on the server.
            </p>

            <h2>How the Information is used</h2>
            <p>
              The information is used to enhance the vistor&apos;s experience
              when using the website to display personalised content and
              possibly advertising.
            </p>

            <p>
              E-mail addresses will not be sold, rented or leased to 3rd
              parties.
            </p>

            <h2>Visitor Options</h2>
            <p>
              If you have subscribed to one of our services, you may unsubscribe
              by following the instructions which are included in e-mail that
              you receive.
            </p>

            <p>
              You may be able to block cookies via your browser settings but
              this may prevent you from access to certain features of the
              website.
            </p>
          </div>
        </div>
      </Main>
    </Layout>
  );
}
