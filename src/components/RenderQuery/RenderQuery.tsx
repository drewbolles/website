import * as React from 'react';

import CircularProgress from '../CircularProgress';

type Props = {
  status: string;
  fallback?: React.ReactElement;
  children: React.ReactNode;
};

export default function RenderQuery({
  children,
  status,
  fallback = <CircularProgress center />,
}: Props) {
  if (status === 'loading') {
    return fallback;
  }
  if (status === 'success') {
    return <>{children}</>;
  }
  if (status === 'error') {
    return <>Opps! Something went wrong</>;
  }
  return <></>;
}
