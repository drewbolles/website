---
title: "Google Analytics and Lighthouse: How to keep your 100"
description: In this post I show you how to keep your 100% performance score in
  Lighthouse while integrating the Google Analytics library.
image: /uploads/giorgio-trovato-oxwmpne_7kw-unsplash.jpg
date: 2020-12-23T19:34:55.318Z
comments: true
---
I recently rebuilt this website, and as I neared the release I was pleasantly surprised that I had very little work to do to achieve all 100's on my Lighthouse audit.

![Perfect Lighthouse score](/uploads/image.png)

This was in large part to [NextJS](https://nextjs.org/) and the amount of optimization that is provided out of the box. This is also due to the simplicity of my website, I do not have complex features or large dependency requirements. Nonetheless I was still pleased by the level of effort necessary for 100's.

But I knew celebration was premature, because I at least wanted Google Analytics loaded on the site to monitor what little traffic I get. Lighthouse ironically does not often like other Google software, and the recommended way of adding Google Analytics dinged me **6 points** in performance, bringing my score to 94. Not satisfied with an A-, I did some research trying to find a solution. I eventually found my answer: [Loading the Google Analytics library directly, instead of using GTag](https://developers.google.com/analytics/devguides/collection/analyticsjs/#alternative_async_tag).

Even further, we want to use the alternate async syntax they provide as an example.

```html
<!-- Google Analytics -->
<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>
<!-- End Google Analytics -->
```

I placed this snippet in my custom \`_document.js\` along with a prefetch link like so: 

```html
<link rel="dns-prefetch" href="https://www.google-analytics.com" />
```

And voila! Google Analytics is successfully loaded, and I still maintained my 100's. Want the screenshot? You already got it! The image above is **after** GA was successfully added.