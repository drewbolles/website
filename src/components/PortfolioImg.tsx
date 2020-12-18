import React from 'react';

const cleanImgSrc = (src: string) => src.replace('/uploads/screenshots/', './');
const requireImgWebp = require.context(
  `../../public/uploads/screenshots?sizes[]=768,sizes[]=1024&format=webp`,
  false,
  /\.(png|jpg)$/,
);
const requireImg = require.context(
  `../../public/uploads/screenshots?sizes[]=768,sizes[]=1024`,
  false,
  /\.(png|jpg)$/,
);

export default function PortfolioImg({
  src,
  alt = '',
}: {
  src: string;
  alt?: string;
}): JSX.Element {
  const imgSrc = cleanImgSrc(src);
  const webpImg = requireImgWebp(imgSrc);
  const img = requireImg(imgSrc);
  return (
    <picture>
      <source srcSet={webpImg.srcSet} type="image/webp" />
      <img
        srcSet={img.srcSet}
        sizes="(min-width: 768px) 50vw, 100vw"
        width={img.width}
        height={img.height}
        src={img.src}
        alt={alt}
      />
    </picture>
  );
}
