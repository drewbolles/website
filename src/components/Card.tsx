import * as React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
};

export function CardHeader({
  icon: Icon,
  title,
  className,
}: Props & { icon?: React.ElementType; title: string }): JSX.Element {
  return (
    <header className={classNames('bg-gray-100', className)}>
      <h3 className="text-xl tracking-wide leading-none flex items-center h-12 py-2 px-4">
        {Icon ? <Icon className="mr-2" /> : null}
        <span>{title}</span>
      </h3>
    </header>
  );
}

export function CardContent({
  className,
  padding = true,
  ...rest
}: React.PropsWithChildren<Props & { padding?: boolean }>): JSX.Element {
  return (
    <div
      className={classNames(
        {
          'p-4 flex-grow flex flex-col overflow-hidden': padding,
          'p-0': padding === false,
        },
        className,
      )}
      {...rest}
    />
  );
}

export default function Card({
  className,
  ...rest
}: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <article
      className={classNames(
        'rounded overflow-hidden flex-grow shadow flex flex-col',
        className,
      )}
      {...rest}
    />
  );
}
