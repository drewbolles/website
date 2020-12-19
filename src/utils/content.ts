import { Blog } from '../types/blog';
import { Event } from '../types/event';
import { Portfolio } from '../types/portfolio';
import { Talk } from '../types/talk';

async function getAllFiles(files, type) {
  return await Promise.all(
    files.map(async path => {
      const markdown = await import(`../../content/${type}/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    }),
  );
}

export const importBlogPosts = async (): Promise<Blog[]> => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context('../../content/blog', false, /\.md$/)
    .keys()
    .map(relativePath => relativePath.substring(2));

  return (await getAllFiles(markdownFiles, 'blog')) as Blog[];
};

export const importPortfolioItems = async (): Promise<Portfolio[]> => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context('../../content/portfolio', false, /\.md$/)
    .keys()
    .map(relativePath => relativePath.substring(2));

  return (await getAllFiles(markdownFiles, 'portfolio')) as Portfolio[];
};

export const importTalks = async (): Promise<Talk[]> => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context('../../content/talks', false, /\.md$/)
    .keys()
    .map(relativePath => relativePath.substring(2));

  return (await getAllFiles(markdownFiles, 'talks')) as Talk[];
};

export const importEvents = async (): Promise<Event[]> => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context('../../content/events', false, /\.md$/)
    .keys()
    .map(relativePath => relativePath.substring(2));

  return (await getAllFiles(markdownFiles, 'events')) as Event[];
};
