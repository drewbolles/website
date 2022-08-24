import * as React from 'react';

import classNames from 'classnames';

type Props = {
  img?: string;
  href?: string;
  primary: React.ReactNode;
  secondary?: React.ReactNode;
  tertiary?: React.ReactNode;
  loading?: boolean;
};

function LoadingBar({ className, ...rest }: React.ComponentProps<'div'>) {
  return (
    <div className={classNames('rounded bg-gray-200', className)} {...rest} />
  );
}

export default function AvatarBlock({
  img,
  href,
  primary,
  secondary,
  tertiary,
  loading,
}: Props) {
  const El = href ? 'a' : 'span';
  return (
    <h4 className="mb-4">
      <El
        href={href}
        className={classNames('flex items-center', {
          'animate-pulse': loading,
        })}
      >
        <span className="mr-4 inline-flex h-16 w-16">
          {loading ? (
            <span className="h-full w-full rounded-full bg-gray-200" />
          ) : img ? (
            <img src={img} className="rounded-full" alt="" width="64" />
          ) : null}
        </span>

        {loading ? (
          <div className="space-y-1">
            <LoadingBar className="h-4 w-24 " />
            <LoadingBar className="h-4 w-32" />
            <LoadingBar className="h-3 w-16" />
          </div>
        ) : (
          <span className="flex flex-col leading-tight">
            <span className="font-semibold leading-tight">{primary}</span>
            {secondary ? (
              <span className="text-sm text-gray-800">{secondary}</span>
            ) : null}
            {tertiary ? (
              <span className="text-xs text-gray-700">{tertiary}</span>
            ) : null}
          </span>
        )}
      </El>
    </h4>
  );
}
