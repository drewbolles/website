import * as React from 'react';

import classNames from 'classnames';

export default function PageTitle({
  className,
  ...rest
}: React.ComponentProps<'h1'>) {
  return (
    <h1
      data-testid="page-title"
      className={classNames(
        'mb-4 text-2xl font-bold md:text-3xl lg:mb-6 lg:text-4xl',
        className,
      )}
      {...rest}
    />
  );
}
