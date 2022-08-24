import * as React from 'react';

import classNames from 'classnames';

export function Row({ className, ...rest }: React.ComponentProps<'div'>) {
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

export function Col({ className, ...rest }: React.ComponentProps<'div'>) {
  return <div className={classNames('px-3 mb-6', className)} {...rest} />;
}
