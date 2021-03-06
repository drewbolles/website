import * as React from 'react';
import Layout from '../components/Layout/Layout';
import Main from '../components/Layout/Main';
import PageTitle from '../components/PageTitle';
import classNames from 'classnames';
import Link from 'next/link';

type IdentityProps = {
  className?: string;
  reveal: boolean;
  src: string;
};

const Identity = ({ className, reveal, ...rest }: IdentityProps) => (
  <img
    className={classNames(
      'transition-opacity',
      { 'opacity-0 hidden': reveal === false },
      { 'opacity-100 block': reveal },
      className,
    )}
    width="254"
    height="306"
    alt=""
    {...rest}
  />
);

function SecretIdentity() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      className="mx-auto"
      style={{ width: 255 }}
    >
      <figure>
        <Identity
          reveal={hovered === false}
          src={require('../../public/images/drew.svg')}
        />
        <Identity
          className="transform translate-y-1 translate-x-2"
          reveal={hovered}
          src={require('../../public/images/batman.svg')}
        />
      </figure>
      <figcaption className="text-xs font-medium">
        Designed by Taylor Bolles
      </figcaption>
    </div>
  );
}

const AboutNav = ({ href, title }: { href: string; title: string }) => (
  <Link href={href}>
    <a className="text-blue-700 underline text-lg hover:text-blue-900">
      {title}
    </a>
  </Link>
);

export default function About(): JSX.Element {
  return (
    <Layout title="About Me">
      <Main>
        <div className="container max-w-prose">
          <PageTitle>About Me</PageTitle>
          <nav className="mb-4 space-x-2">
            <AboutNav title="Resume" href="/resume" />
          </nav>
          <div className="prose mb-6 md:prose-xl">
            <p>
              Hi, I&apos;m Drew and I&apos;m a Software Engineer. I began my
              voyage into web development when I was about 10, building sites
              with GeoCities before moving into coding layouts in tables. Fast
              forward a few years, and I&apos;m still plodding about in HTML
              &amp; CSS, reading A List Part, and developing fan sites for my
              favorite shows. I pride myself on being a responsible web
              developer, and striving to solve problems by putting people first.
            </p>
            <SecretIdentity />
            <p>
              My primary areas of interest lie in front-end development,
              performance, and JavaScript applications. All sites and
              applications should be fast, beautiful, and accessible, and I
              truly believe in providing all of my users the best experience
              possible.
            </p>
            <p className="border-t border-gray-200 pt-6">
              <a
                href="mailto:contact@drewbolles.com"
                className="inline-flex items-center"
              >
                Get in touch with me
              </a>
            </p>
          </div>
        </div>
      </Main>
    </Layout>
  );
}
