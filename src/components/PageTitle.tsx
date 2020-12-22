import * as React from 'react';
import classNames from 'classnames';

export default function PageTitle({
  className,
  ...rest
}: React.PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
}>): JSX.Element {
  return (
    <h1
      data-testid="page-title"
      className={classNames(
        'text-2xl font-bold mb-6 md:text-3xl lg:text-4xl',
        className,
      )}
      {...rest}
    />
  );
}
