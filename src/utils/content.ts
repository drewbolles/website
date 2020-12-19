import { Blog } from '../types/blog';
import { Event } from '../types/event';
import { Portfolio } from '../types/portfolio';
import { Talk } from '../types/talk';

async function getFileContent(files, type) {
  const fileContentMap = files
    .keys()
    .map(relativePath => relativePath.substring(2))
    .map(async path => {
      const markdown = await import(`../../content/${type}/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    });

  return await Promise.all(fileContentMap);
}

export const importBlogPosts = async (): Promise<Blog[]> => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const files = require.context('../../content/blog', false, /\.md$/);

  return (await getFileContent(files, 'blog')) as Blog[];
};

export const importPortfolioItems = async (): Promise<Portfolio[]> => {
  const files = require.context('../../content/portfolio', false, /\.md$/);

  return (await getFileContent(files, 'portfolio')) as Portfolio[];
};

export const importTalks = async (): Promise<Talk[]> => {
  const files = require.context('../../content/talks', false, /\.md$/);

  return (await getFileContent(files, 'talks')) as Talk[];
};

export const importEvents = async (): Promise<Event[]> => {
  const files = require.context('../../content/events', false, /\.md$/);

  return (await getFileContent(files, 'events')) as Event[];
};
