import * as React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { GA_TRACKING_ID } from '../utils/ga';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    return await Document.getInitialProps(ctx);
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#ffffff" />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#333333" />
          <meta name="msapplication-TileColor" content="#2d89ef" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
            ga('create', '${GA_TRACKING_ID}', 'auto');
            ga('send', 'pageview');`,
            }}
          />
          <script async src="https://www.google-analytics.com/analytics.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
