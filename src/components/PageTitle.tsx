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
        'text-2xl font-bold mb-4 lg:mb-8 md:text-3xl lg:text-4xl',
        className,
      )}
      {...rest}
    />
  );
}
