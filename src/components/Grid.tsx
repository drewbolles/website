import * as React from 'react';

import classNames from 'classnames';

export function Row({ className, ...rest }: React.ComponentProps<'div'>) {
  return (
    <div
      className={classNames(
        '-mx-3 -mb-6 flex flex-col flex-wrap md:flex-row',
        className,
      )}
      {...rest}
    />
  );
}

export function Col({ className, ...rest }: React.ComponentProps<'div'>) {
  return <div className={classNames('mb-6 px-3', className)} {...rest} />;
}
