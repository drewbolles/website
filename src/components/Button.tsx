import * as React from 'react';

import classNames from 'classnames';

export default function Button({
  className,
  href,
  ...rest
}: React.PropsWithChildren<{
  href?: string;
  className?: string;
}>) {
  const El = href ? 'a' : 'button';
  return (
    <El
      className={classNames(
        className,
        'inline-flex items-center px-4 h-12 bg-blue-700 text-white font-semibold rounded hover:bg-blue-900 transition-colors',
      )}
      href={href}
      {...rest}
    />
  );
}
