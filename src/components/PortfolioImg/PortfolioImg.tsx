import React from 'react';
import { responsiveImgs } from './requireImages';

const cleanImgSrc = (src: string) => src.replace('/uploads/screenshots/', './');

function renderSource(src: string) {
  return function RenderedSource({
    mq,
    requireFn,
  }: {
    mq: string;
    requireFn: __WebpackModuleApi.RequireContext;
  }): JSX.Element {
    const img = requireFn(src);
    const fileType = img.src.split('.').pop().replace('jpg', 'jpeg');
    return (
      <source
        srcSet={img.srcSet}
        media={mq}
        type={`image/${fileType}`}
        key={img.src}
      />
    );
  };
}

export default function PortfolioImg({
  src,
  alt = '',
}: {
  src: string;
  alt?: string;
}): JSX.Element {
  const imgSrc = cleanImgSrc(src);
  const img = responsiveImgs.base[0].requireFn(imgSrc);

  return (
    <picture data-testid="portfolio-img">
      {responsiveImgs.webp.map(renderSource(imgSrc))}
      {responsiveImgs.base.map(renderSource(imgSrc))}
      <img width={img.width} height={img.height} src={img.src} alt={alt} />
    </picture>
  );
}
