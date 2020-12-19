import * as React from 'react';
import classNames from 'classnames';

export default function Main({
  className,
  ...rest
}: React.PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <main
      className={classNames('flex-grow py-8 md:py-12', className)}
      {...rest}
    />
  );
}
