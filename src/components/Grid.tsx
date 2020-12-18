import * as React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function Row({
  className,
  children,
  ...rest
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <div
      className={classNames('flex flex-wrap -mx-3 -mb-6', className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Col({
  className,
  children,
  ...rest
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <div className={classNames('px-3 mb-6', className)} {...rest}>
      {children}
    </div>
  );
}
