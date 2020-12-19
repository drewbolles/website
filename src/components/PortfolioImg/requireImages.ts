export const requireImgWebp = require.context(
  `../../../public/uploads/screenshots?sizes[]=768,sizes[]=1024&format=webp`,
  false,
  /\.(png|jpg)$/,
);

export const requireImg = require.context(
  `../../../public/uploads/screenshots?sizes[]=768,sizes[]=1024`,
  false,
  /\.(png|jpg)$/,
);
