/* eslint-disable @typescript-eslint/no-var-requires */
const RSS = require('rss');
const fs = require('fs');
const path = require('path');
const frontMatter = require('front-matter');
const { baseUrl, description, author } = require('./site.config');
/* eslint-enable @typescript-eslint/no-var-requires */

const blogPostDir = path.resolve(__dirname, 'content', 'blog');

const feed = new RSS({
  title: `${author}'s blog`,
  description: description,
  feed_url: `${baseUrl}/rss.xml`,
  site_url: baseUrl,
  managingEditor: author,
  webMaster: author,
  copyright: `2020 ${author}`,
  language: 'en',
  pubDate: new Date().toLocaleString(),
  ttl: '60',
});

fs.readdirSync(blogPostDir)
  .map(fileName => {
    const fullPath = path.join(blogPostDir, fileName);
    const file = fs.readFileSync(fullPath, 'utf8');
    const { attributes } = frontMatter(file);
    return { ...attributes, fileName };
  })
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  .forEach(({ title, description, date, fileName }) => {
    feed.item({
      title,
      description,
      url: `https://www.drewbolles.com/blog/${fileName.replace('.md', '')}`,
      author,
      date,
    });
  });

const xml = feed.xml();

fs.writeFileSync(path.resolve(__dirname, 'public') + '/rss.xml', xml);
