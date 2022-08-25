import * as React from 'react';

import classNames from 'classnames';

export default function Main({
  className,
  ...rest
}: React.ComponentProps<'main'>) {
  return (
    <main
      className={classNames('flex-grow py-8 print:p-0 md:py-12', className)}
      {...rest}
    />
  );
}
