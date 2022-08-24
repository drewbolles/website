import '../styles/globals.css';

import * as React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import { AppProps } from 'next/app';
import { Hydrate } from 'react-query/hydration';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
