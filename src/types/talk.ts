export type Talk = {
  attributes: {
    title: string;
    date: string;
    slides: {
      slides_url: string;
      slides_embed: string;
    };
    events?: string[];
  };
};
