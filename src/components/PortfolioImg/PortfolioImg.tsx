import React from "react";
import { requireImg, requireImgWebp } from "./requireImages";

const cleanImgSrc = (src: string) => src.replace("/uploads/screenshots/", "./");

export default function PortfolioImg({
  src,
  alt = "",
}: {
  src: string;
  alt?: string;
}): JSX.Element {
  const imgSrc = cleanImgSrc(src);
  const webpImg = requireImgWebp(imgSrc);
  const img = requireImg(imgSrc);

  return webpImg && img ? (
    <picture data-testid="portfolio-img">
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
  ) : null;
}
