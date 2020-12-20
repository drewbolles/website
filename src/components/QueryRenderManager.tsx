import * as React from 'react';
import CircularProgress from './CircularProgress';

type Props = {
  status: string;
  fallback?: React.ReactElement;
};

export default function QueryRenderManager({
  children,
  status,
  fallback = <CircularProgress center />,
}: React.PropsWithChildren<Props>): JSX.Element {
  if (status === 'loading') {
    return fallback;
  }
  if (status === 'success') {
    return <>{children}</>;
  }
  if (status === 'error') {
    return <>Opps! Something went wrong</>;
  }
}
