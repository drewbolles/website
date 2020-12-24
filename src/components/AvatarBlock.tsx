import React, { ReactNode } from 'react';
import classNames from 'classnames';

type Props = {
  img: string;
  href?: string;
  primary: ReactNode;
  secondary?: ReactNode;
  tertiary?: ReactNode;
  loading?: boolean;
};

const LoadingBar = ({ className, ...rest }: { className: string }) => (
  <div className={classNames('bg-gray-200 rounded', className)} {...rest} />
);

export default function AvatarBlock({
  img,
  href,
  primary,
  secondary,
  tertiary,
  loading,
}: Props): JSX.Element {
  const El = href ? 'a' : 'span';
  return (
    <h4 className="mb-4">
      <El
        href={href}
        className={classNames('flex items-center', {
          'animate-pulse': loading,
        })}
      >
        <span className="inline-flex w-16 h-16 mr-4">
          {loading ? (
            <span className="w-full h-full rounded-full bg-gray-200" />
          ) : (
            <img src={img} className="rounded-full" alt="" width="64" />
          )}
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
