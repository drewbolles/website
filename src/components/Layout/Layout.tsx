import { NextSeo } from 'next-seo';
import * as React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const links = [
  ['/about', 'About'],
  ['/work', 'Work'],
  ['/talks', 'Talks'],
  ['/blog', 'Blog'],
];

function Link({ href, ...rest }: React.PropsWithChildren<{ href: string }>) {
  const { asPath } = useRouter();

  return (
    <NextLink href={href}>
      <a
        className={classNames(
          'text-sm md:text-base h-full inline-flex items-center px-1 md:px-4 rounded-sm transition-colors text-gray-700 hover:bg-blue-50',
          { 'bg-blue-50': asPath.includes(href) },
        )}
        {...rest}
      />
    </NextLink>
  );
}

const FooterIconLink = props => (
  <a className="inline-flex w-12 h-12 items-center justify-center" {...props} />
);

type Props = {
  title?: string;
  description?: string;
};

export default function Layout({
  children,
  title = `Drew Bolles | Software Engineer`,
  description = 'Software Engineer with over a decade of experience specializing in React, Node, and TypeScript',
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        twitter={{ handle: 'bollskis' }}
        openGraph={{ type: 'website', title, description }}
      />
      <div className="flex flex-col min-h-screen antialiased font-sans text-gray-900 pt-12 md:pt-16">
        <header className="shadow fixed top-0 w-full bg-white">
          <div className="container flex items-center justify-between h-12 md:h-16">
            <NextLink href="/">
              <a className="flex flex-col">
                <span className="font-semibold tracking-wide md:text-lg leading-snug md:leading-snug">
                  Drew Bolles
                </span>
              </a>
            </NextLink>
            <nav className="space-x-2 py-1 flex items-center h-full">
              {links.map(([path, title]) => (
                <Link href={path} key={path}>
                  {title}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        {children}
        <footer className="py-6 bg-gray-100 text-center">
          <div className="container md:flex items-center justify-between">
            <p className="text-xs">
              &copy; Copyright {new Date().getFullYear()}. All rights reserved.
            </p>
            <ul className="inline-flex">
              <li>
                <FooterIconLink
                  href="https://twitter.com/bollskis"
                  title="Follow me on Twitter"
                >
                  <FaTwitter />
                </FooterIconLink>
              </li>
              <li>
                <FooterIconLink
                  href="https://github.com/drewbolles"
                  title="Check me out on GitHub"
                >
                  <FaGithub />
                </FooterIconLink>
              </li>
              <li>
                <FooterIconLink
                  href="https://www.linkedin.com/in/drew-bolles/"
                  title="Connect with me on LinkedIn"
                >
                  <FaLinkedin />
                </FooterIconLink>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
