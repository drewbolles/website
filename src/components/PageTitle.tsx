import * as React from 'react';
import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function PageTitle({
  children,
  className,
  ...rest
}: Props): JSX.Element {
  return (
    <h1
      className={classNames(
        'text-2xl font-bold mb-6 md:text-3xl lg:text-4xl',
        className,
      )}
      {...rest}
    >
      {children}
    </h1>
  );
}
