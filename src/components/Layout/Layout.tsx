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
          'inline-flex h-full items-center rounded-sm px-1 text-sm font-semibold text-gray-700 transition-colors hover:bg-blue-50 md:px-4 md:text-base',
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
      className="inline-flex h-12 w-12 items-center justify-center text-gray-600 hover:text-gray-900"
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
    className="inline-flex h-12 items-center underline sm:h-auto"
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
      <div className="flex min-h-screen flex-col pt-12 font-sans text-gray-900 antialiased md:pt-16">
        <header className="fixed top-0 z-50 w-full bg-white shadow">
          <div className="container flex h-12 items-center justify-between md:h-16">
            <NextLink href="/">
              <a className="flex flex-col">
                <span className="font-semibold leading-snug tracking-wide md:text-lg md:leading-snug">
                  Drew Bolles
                </span>
              </a>
            </NextLink>
            <nav className="flex h-full items-center space-x-2 py-2">
              {links.map(([path, title]) => (
                <Link href={path} key={path}>
                  {title}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        {children}
        <footer className="bg-gray-100 py-6 text-center">
          <div className="container items-center justify-between md:flex">
            <div className="mb-1 flex flex-col items-center space-y-1 text-xs md:mb-0">
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
