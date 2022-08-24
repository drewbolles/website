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
        'inline-flex h-12 items-center rounded bg-blue-700 px-4 font-semibold text-white transition-colors hover:bg-blue-900',
      )}
      href={href}
      {...rest}
    />
  );
}
