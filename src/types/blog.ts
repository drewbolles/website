export type Blog = {
  attributes: {
    title: string;
    description: string;
    date: string;
    image?: string;
    ogImage?: string;
  };
  html?: string;
  slug: string;
};
