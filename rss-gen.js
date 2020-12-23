/* eslint-disable */
const RSS = require('rss');
const fs = require('fs');
const path = require('path');
const frontMatter = require('front-matter');
const { baseUrl, description, author } = require('./site.config');

const feed = new RSS({
  title: `${author}'s Blog RSS Feed`,
  description: description,
  feed_url: `${baseUrl}/rss.xml`,
  site_url: baseUrl,
  managingEditor: author,
  webMaster: author,
  copyright: `2020 ${author}`,
  language: 'en',
  //May 20, 2012 04:00:00 GMT
  pubDate: new Date().toLocaleString(),
  ttl: '60',
});
const blogPostDir = path.resolve(__dirname, 'content', 'blog');
const blogPosts = fs.readdirSync(blogPostDir);

const items = blogPosts.map(fileName => {
  const fullPath = path.join(blogPostDir, fileName);
  const file = fs.readFileSync(fullPath, 'utf8');
  const { attributes } = frontMatter(file);
  return { ...attributes, fileName };
});

items
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
