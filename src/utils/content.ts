import { Blog } from '../types/blog';
import { Event } from '../types/event';
import { Portfolio } from '../types/portfolio';
import { Talk } from '../types/talk';

export const importBlogPosts = async (): Promise<Blog[]> => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context('../../content/blog', false, /\.md$/)
    .keys()
    .map(relativePath => relativePath.substring(2));

  return Promise.all(
    markdownFiles.map(async path => {
      const markdown = await import(`../../content/blog/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    }),
  );
};

export const importPortfolioItems = async (): Promise<Portfolio[]> => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context('../../content/portfolio', false, /\.md$/)
    .keys()
    .map(relativePath => relativePath.substring(2));
  return Promise.all(
    markdownFiles.map(async path => {
      const markdown = await import(`../../content/portfolio/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    }),
  );
};

export const importTalks = async (): Promise<Talk[]> => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context('../../content/talks', false, /\.md$/)
    .keys()
    .map(relativePath => relativePath.substring(2));
  return Promise.all(
    markdownFiles.map(async path => {
      const markdown = await import(`../../content/talks/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    }),
  );
};

export const importEvents = async (): Promise<Event[]> => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context('../../content/events', false, /\.md$/)
    .keys()
    .map(relativePath => relativePath.substring(2));
  return Promise.all(
    markdownFiles.map(async path => {
      const markdown = await import(`../../content/events/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    }),
  );
};
