import * as React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import * as ga from '../utils/ga';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
