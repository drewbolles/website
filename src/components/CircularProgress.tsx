import * as React from 'react';
import classNames from 'classnames';
import { AiOutlineLoading } from 'react-icons/ai';

export default function CircularProgress({
  className,
  size = '2.5rem',
  center,
  ...rest
}: React.PropsWithChildren<{
  className?: string;
  size?: string | number;
  center?: boolean;
}>): JSX.Element {
  return (
    <AiOutlineLoading
      size={size}
      data-testid="circular-progress"
      className={classNames(
        'animate-spin text-gray-800',
        { 'text-center m-auto': center },
        className,
      )}
      {...rest}
    />
  );
}
