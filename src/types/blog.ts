export type Blog = {
  attributes: {
    title: string;
    description: string;
    date: string;
  };
  html?: string;
  slug: string;
};
