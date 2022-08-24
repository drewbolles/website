import { Blog } from '../types/blog';
import { Event } from '../types/event';
import { Portfolio } from '../types/portfolio';
import { Talk } from '../types/talk';

async function getFileContent(
  files: ReturnType<typeof require.context>,
  type: string,
) {
  const fileContentMap = files
    .keys()
    .map(relativePath => relativePath.substring(2))
    .map(async path => {
      const markdown = await import(`../../content/${type}/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    });

  return await Promise.all(fileContentMap);
}

// https://webpack.js.org/guides/dependency-management/#requirecontext
export const importBlogPosts = async (): Promise<Blog[]> =>
  (await getFileContent(
    require.context('../../content/blog', false, /\.md$/),
    'blog',
  )) as Blog[];

export const importPortfolioItems = async (): Promise<Portfolio[]> =>
  (await getFileContent(
    require.context('../../content/portfolio', false, /\.md$/),
    'portfolio',
  )) as Portfolio[];

export const importTalks = async (): Promise<Talk[]> =>
  (await getFileContent(
    require.context('../../content/talks', false, /\.md$/),
    'talks',
  )) as Talk[];

export const importEvents = async (): Promise<Event[]> =>
  (await getFileContent(
    require.context('../../content/events', false, /\.md$/),
    'events',
  )) as Event[];
