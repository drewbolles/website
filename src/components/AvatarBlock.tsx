import React, { ReactNode } from 'react';

type Props = {
  img: string;
  href?: string;
  primary: ReactNode;
  secondary?: ReactNode;
  tertiary?: ReactNode;
};

export default function AvatarBlock({
  img,
  href,
  primary,
  secondary,
  tertiary,
}: Props): JSX.Element {
  const El = href ? 'a' : 'span';
  return (
    <h4 className="mb-4">
      <El href={href} className="flex items-center">
        <span className="w-16 h-16 mr-4">
          <img src={img} className="rounded-full" alt="" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-semibold leading-tight">{primary}</span>
          {secondary ? (
            <span className="text-sm text-gray-800">{secondary}</span>
          ) : null}
          {tertiary ? (
            <span className="text-xs text-gray-700">{tertiary}</span>
          ) : null}
        </span>
      </El>
    </h4>
  );
}
