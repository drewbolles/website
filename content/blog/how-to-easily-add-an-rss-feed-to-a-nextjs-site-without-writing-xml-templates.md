---
title: How to easily add an RSS feed to a NextJS site without writing XML templates
description: In this post I show you how to easily add an RSS feed for your
  NextJS site. There are a few examples of adding RSS feeds to your static
  NextJS site however they just weren't easy enough for me. Lots of html in
  template literals and string concatenation and that just won't do!
date: 2020-12-24T13:33:01.954Z
comments: true
---
I like providing an RSS feed for my blog posts, it's old school but still relevant as I know **quite a few people** who still use RSS feed readers to digest their news. One of the things I took for granted in my old PHP CMS days was how many little things it did for you under-the-hood. Sitemaps, RSS feeds, these small niceties that add professional touches to your projects are old school in relative terms, but still very important. I so much more enjoy building with today's tools than yesteryear's, but one of the few things NextJS does not do for you is generating an RSS feed. There is no \`next-rss\` (yet!) but I am going to show you an easy way to turn a directory of blog posts into an RSS feed **without** touch an XML template.

## Setup

I'm going to show you how to use the \`rss\` npm package to create concise node script that will be run after a successful next build.

**Note:** My example uses the filesystem to store the content in .md files. However, this process can be tweaked to fetch data from an API, or however you need to grab the pages / posts that you want in your RSS feed.

Install the \`rss\` and \`front-matter\` packages:

```
npm i -D rss front-matter
```

Create our script, I'm calling it \`rss-gen\`:

```
touch rss-gen.js
```

Now before we forget, let's add the postbuild script to our package.json:

```json
{
  "scripts": {
    // ...
    "postbuild": "node rss-gen",
   },
}
```

Now let's get to work on our script to generate our RSS. First, let's setup the feed per the instructions on the NPM page.

```javascript
const RSS = require('rss');
const fs = require('fs');
const path = require('path');

// setup our feed instance with some high level data
// I often keep this kind of data in package.json or a config file
// so that it can be shared with other things that need it, i.e. next-seo
const feed = new RSS({
  title: `Drew Bolles's Blog RSS Feed`,
  description: 'Your description',
  feed_url: `https://www.drewbolles.com/rss.xml`,
  site_url: `https://www.drewbolles.com`,
  managingEditor: 'Drew Bolles',
  webMaster: 'Drew Bolles',
  copyright: `2020 Drew Bolles`,
  language: 'en',
  pubDate: new Date().toLocaleString(),
  ttl: '60',
});

// this will generate our XML for our feed, no more messing with templates!
const xml = feed.xml();

// NextJS looks for static files in the public directory, so that is
// where we will write our file
fs.writeFileSync(path.resolve(__dirname, 'public') + '/rss.xml', xml);
```

Great, this script should be able to be run now! Try it out in your console:

```
node rss-gen.js
```

You should see the RSS file generated at \`/public/rss.xml\`. Great! Now time to add your blog posts (or whatever content you want).

I'm using the NetlifyCMS and my content is housed in the \`/content\` directory. I have a few content types, but I only want my blog posts in my RSS feed. My \`rss-gen.js\` script now looks like this:

```javascript
const RSS = require('rss');
const fs = require('fs');
const path = require('path');
const frontMatter = require('front-matter');


// my blog posts live in `/content/blog`
const blogPostDir = path.resolve(__dirname, 'content', 'blog');

const feed = new RSS({
  title: `Drew Bolles's Blog RSS Feed`,
  description: 'Your description',
  feed_url: `https://www.drewbolles.com/rss.xml`,
  site_url: `https://www.drewbolles.com`,
  managingEditor: 'Drew Bolles',
  webMaster: 'Drew Bolles',
  copyright: `2020 Drew Bolles`,
  language: 'en',
  pubDate: new Date().toLocaleString(),
  ttl: '60',
});

// read all the files in my blog post dir, however you can grab
// an array of data however, via node-fetch or json files, etc
fs.readdirSync(blogPostDir)
  .map(fileName => {
    // we need the full path of the file to be able to read it
    const fullPath = path.join(blogPostDir, fileName);
    // read the file so we can grab the front matter
    const file = fs.readFileSync(fullPath, 'utf8');
    // for the RSS feed we don't need the html, we
    // just want the attributes
    const { attributes } = frontMatter(file);
    // I want access to the fileName later on so we save it to our object
    return { ...attributes, fileName };
  })
  // sort the items by date in descending order, feel free
  // to customize this as needed to sort your RSS items properly
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  // loop over each blog post and add it to our RSS feed
  .forEach(({ title, description, date, fileName }) => {
    // title, description, and date are properties of my front matter
    // attributes. Yours might be different depending on your data structure
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

```

And, voila! Assuming you have a \`/content/blog\` directory with markdown files you can run this script and you will see a full RSS feed generated for you at \`/public/rss.xml\`. As I promised, no XML templates to maintain!

Now due to our \`postbuild\` script, when we build our NextJS site, our RSS feed will be automatically generated either before exporting a static site or deploying your build.

### Caveats

This may not work with a massive amount of blog posts. Your mileage may vary depending on the amount of content you have. If you run into issues with large amounts of data, please share your findings and how you solved the issue!