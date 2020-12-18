export type Portfolio = {
  attributes: {
    title: string;
    date: string;
    description: string;
    technologies: string[];
    image: string;
    featured?: boolean;
    role?: string;
    url: string;
  };
  slug: string;
};
