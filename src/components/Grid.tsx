import * as React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
};

export function Row({
  className,
  ...rest
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <div
      className={classNames(
        'flex flex-col md:flex-row flex-wrap -mx-3 -mb-6',
        className,
      )}
      {...rest}
    />
  );
}

export function Col({
  className,
  ...rest
}: React.PropsWithChildren<Props>): JSX.Element {
  return <div className={classNames('px-3 mb-6', className)} {...rest} />;
}
