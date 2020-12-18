import * as React from 'react';
import '../styles/globals.css';

type Props = {
  Component: React.ElementType;
  pageProps: unknown;
};

function MyApp({ Component, pageProps }: Props): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
