import React from 'react';

const cleanImgSrc = src => src.replace('/uploads/screenshots/', './');
const requireImgWebp = require.context(
  `../../public/uploads/screenshots?size=1098&format=webp`,
  false,
  /\.(png|jpg)$/,
);
const requireImgRetina = require.context(
  `../../public/uploads/screenshots?size=1464`,
  false,
  /\.(png|jpg)$/,
);
const requireImg = require.context(
  `../../public/uploads/screenshots?size=732`,
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
  return (
    <picture>
      <source srcSet={requireImgWebp(imgSrc)} type="image/webp" />
      <source
        srcSet={`${requireImg(imgSrc)} 1x, ${requireImgRetina(imgSrc)} 2x`}
      />
      <img src={requireImg(imgSrc)} alt={alt} width="732px" />
    </picture>
  );
}
