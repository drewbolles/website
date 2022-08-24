import * as React from 'react';

import { FaGithub, FaLinkedin, FaRssSquare, FaTwitter } from 'react-icons/fa';

import NextLink from 'next/link';
import { NextSeo } from 'next-seo';
import classNames from 'classnames';
import siteConfig from '../../../site.config';
import { useRouter } from 'next/router';

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
          'text-sm h-full inline-flex items-center px-1 rounded-sm transition-colors text-gray-700 font-semibold hover:bg-blue-50 md:px-4 md:text-base',
          { 'bg-blue-50': asPath.includes(href) },
        )}
        {...rest}
      />
    </NextLink>
  );
}

function FooterIconLink(props: React.ComponentProps<'a'>) {
  return (
    <a
      className="inline-flex w-12 h-12 items-center justify-center text-gray-600 hover:text-gray-900"
      {...props}
    />
  );
}

const FooterLink = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<{ href?: string }>
>((props, ref) => (
  <a
    ref={ref}
    className="underline h-12 inline-flex items-center sm:h-auto"
    {...props}
  />
));

FooterLink.displayName = 'FooterLink';

export default function Layout({
  children,
  title = `Drew Bolles | Software Engineer`,
  description = siteConfig.description,
  image,
  type = 'website',
}: {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  children: React.ReactNode;
}) {
  // modern SEO best practices recommmend 120 character descriptions
  const trimmedDescription =
    description.length > 120
      ? `${description.substring(0, 117)}...`
      : description;
  return (
    <>
      <NextSeo
        title={title}
        description={trimmedDescription}
        twitter={{
          handle: '@bollskis',
          site: siteConfig.baseUrl,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          type,
          title,
          description: trimmedDescription,
          locale: 'en_US',
          ...(image && {
            images: [
              {
                url: `https://www.drewbolles.com${image}`,
              },
            ],
          }),
        }}
        additionalMetaTags={[
          {
            name: 'author',
            content: siteConfig.author,
          },
        ]}
      />
      <div className="flex flex-col min-h-screen antialiased font-sans text-gray-900 pt-12 md:pt-16">
        <header className="shadow fixed top-0 z-50 w-full bg-white">
          <div className="container flex items-center justify-between h-12 md:h-16">
            <NextLink href="/">
              <a className="flex flex-col">
                <span className="font-semibold tracking-wide md:text-lg leading-snug md:leading-snug">
                  Drew Bolles
                </span>
              </a>
            </NextLink>
            <nav className="space-x-2 py-2 flex items-center h-full">
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
            <div className="flex flex-col space-y-1 items-center text-xs mb-1 md:mb-0">
              <p className="">
                &copy; Copyright {new Date().getFullYear()}. All rights
                reserved.
              </p>
              <nav className="flex items-center space-x-1">
                <NextLink passHref href="/privacy-policy">
                  <FooterLink>Privacy policy</FooterLink>
                </NextLink>
                <span>/</span>
                <NextLink passHref href="/resume">
                  <FooterLink>Resume</FooterLink>
                </NextLink>
                <span>/</span>
                <FooterLink href="mailto:contact@drewbolles.com">
                  Contact Me
                </FooterLink>
              </nav>
            </div>
            <ul className="inline-flex">
              <li>
                <FooterIconLink
                  href="https://twitter.com/bollskis"
                  title="Follow me on Twitter"
                >
                  <FaTwitter size="24" />
                </FooterIconLink>
              </li>
              <li>
                <FooterIconLink
                  href="https://github.com/drewbolles"
                  title="Check me out on GitHub"
                >
                  <FaGithub size="24" />
                </FooterIconLink>
              </li>
              <li>
                <FooterIconLink
                  href="https://www.linkedin.com/in/drew-bolles/"
                  title="Connect with me on LinkedIn"
                >
                  <FaLinkedin size="24" />
                </FooterIconLink>
              </li>
              <li>
                <FooterIconLink
                  href="/rss.xml"
                  title="Subscribe to my RSS Feed"
                >
                  <FaRssSquare size="24" />
                </FooterIconLink>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
