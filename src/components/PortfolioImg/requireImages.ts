const mqs = {
  sm: '(max-width: 768px)',
  md: '(min-width: 769px)',
};

export const responsiveImgs = {
  base: [
    {
      mq: mqs.sm,
      requireFn: require.context(
        `../../../public/uploads/screenshots?size=768`,
        false,
        /\.(png|jpg)$/,
      ),
    },
    {
      mq: mqs.md,
      requireFn: require.context(
        `../../../public/uploads/screenshots?size=1024`,
        false,
        /\.(png|jpg)$/,
      ),
    },
  ],
  webp: [
    {
      mq: mqs.sm,
      requireFn: require.context(
        `../../../public/uploads/screenshots?size=768&format=webp`,
        false,
        /\.(png|jpg)$/,
      ),
    },
    {
      mq: mqs.md,
      requireFn: require.context(
        `../../../public/uploads/screenshots?size=1024&format=webp`,
        false,
        /\.(png|jpg)$/,
      ),
    },
  ],
};
