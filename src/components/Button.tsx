import * as React from 'react';
import classNames from 'classnames';

type Props = {
  href?: string;
  className?: string;
};

const Button: React.FC<Props> = ({ className, href, ...rest }: Props) => {
  const El = href ? 'a' : 'button';
  return (
    <El
      className={classNames(
        className,
        'inline-flex items-center px-4 h-12 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors',
      )}
      href={href}
      {...rest}
    />
  );
};

export default Button;
