export type Blog = {
  attributes: {
    title: string;
    description: string;
    date: string;
    image?: string;
  };
  html?: string;
  slug: string;
};
