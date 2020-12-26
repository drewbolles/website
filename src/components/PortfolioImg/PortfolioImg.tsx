import React from 'react';
import Image from 'next/image';

export default function PortfolioImg({
  src,
  alt = '',
  minHeight = 500,
}: {
  src: string;
  alt?: string;
  minHeight?: number;
}): JSX.Element {
  return (
    <div
      className="h-full overflow-hidden relative rounded shadow-lg md:shadow-xl lg:shadow-2xl"
      style={{ minHeight }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        objectPosition="center top"
        sizes="(min-width: 768px) 50vw, 100vw"
        data-testid="portfolio-img"
      />
    </div>
  );
}
