import * as React from 'react';

import classNames from 'classnames';

type Props = {
  className?: string;
};

export function CardHeader({
  icon: Icon,
  title,
  className,
}: Props & { icon?: React.ElementType; title: string }) {
  return (
    <header className={classNames('bg-gray-100', className)}>
      <h2 className="flex h-12 items-center py-2 px-4 text-xl leading-none tracking-wide">
        {Icon ? <Icon className="mr-2" /> : null}
        <span>{title}</span>
      </h2>
    </header>
  );
}

export function CardContent({
  className,
  padding = true,
  ...rest
}: React.PropsWithChildren<Props & { padding?: boolean }>) {
  return (
    <div className="aspect-w-9 aspect-h-12">
      <div
        className={classNames(
          {
            'flex flex-grow flex-col overflow-hidden p-4 ': padding,
            'p-0': padding === false,
          },
          className,
        )}
        {...rest}
      />
    </div>
  );
}

export default function Card({
  className,
  ...rest
}: React.PropsWithChildren<Props>) {
  return (
    <article
      className={classNames(
        'flex flex-grow flex-col overflow-hidden rounded shadow',
        className,
      )}
      {...rest}
    />
  );
}
