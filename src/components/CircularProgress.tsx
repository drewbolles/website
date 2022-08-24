import * as React from 'react';

import { AiOutlineLoading } from 'react-icons/ai';
import classNames from 'classnames';

export default function CircularProgress({
  className,
  size = '2.5rem',
  center,
  ...rest
}: React.PropsWithChildren<{
  className?: string;
  size?: string | number;
  center?: boolean;
}>) {
  return (
    <AiOutlineLoading
      size={size}
      data-testid="circular-progress"
      className={classNames(
        'animate-spin text-gray-800',
        { 'm-auto text-center': center },
        className,
      )}
      {...rest}
    />
  );
}
