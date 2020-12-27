---
title: Who is the better host for a NextJS site, Vercel or Netlify and how
  next/image stole the show
description: In this post I talk about the differences between Vercel and
  Netlify hosting for a NextJS site, and why I eventually went with Vercel. Both
  are awesome products that I would recommend to anyone trying to build a modern
  web site or application, but the one thing that set Vercel apart was the
  <Image /> component from the next/image package.
image: /uploads/jaime-spaniol-l0n74gwsq8-unsplash.jpg
date: 2020-12-26T22:03:40.104Z
comments: true
---
When building a NextJS site or application, hosting on Vercel might seem like the natural best choice, however there are quite a few great hosting options these days. I recently battle tested Netlify after falling head-over-heals for their repository-based CMS, aptly named Netlify CMS, which currently powers this site. Their platform was great, intuitive, well designed, easy to use and powerful with very little configuration. Everything you would come to expect from a modern DX focused product. I had no complaints about Netlify at all, I would recommend them again to anyone with a project the was right for their platform.

## The Dilemma

Outside of hosting, however, I've been struggling to figure out the best way to handle images for my sites. My ideal solution is I give a script, server, or service my un-compressed, un-cropped, un-optimized image, give it as little information up-front as necessary, crop if necessary (potentially multiple times for art-directed responsive images) and get back responsive image ready variations. It sounds like a big ask, but responsive images have been around for a while and this is really mostly a lot of administration work. I'm just tired of manually stringing together \`require.context\` functions to get dynamic images to work correctly with `next-optimized-images`. I want to point something at my local image and tell it to go to work. Enter `next/image`.

> Since version **10.0.0**, Next.js has a built-in Image Component and Automatic Image Optimization.
>
> The Next.js Image Component, [`next/image`](https://nextjs.org/docs/api-reference/next/image), is an extension of the HTML `<img>` element, evolved for the modern web.
>
> The Automatic Image Optimization allows for resizing, optimizing, and serving images in modern formats like [WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types) when the browser supports it. This avoids shipping large images to devices with a smaller viewport. It also allows Next.js to automatically adopt future image formats and serve them to browsers that support those formats.
>
> *\- nextjs.org docs*

Perfect! This reads like exactly what I've been looking for, the syntax is even very concise:

```javascript
import Image from 'next/image'

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        // me.png would live in /public here, which is the default
        // public dir for a NextJS app
        src="/me.png"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <p>Welcome to my homepage!</p>
    </>
  )
}

export default Home
```

Great, sign me up, seems like all my problems are solved. Alas, a catch: you need to be running `next start` which requires a node server, which Netlify does not provide. Netlify provides server-like functionality via functions, which next/image does not work with (yet?). Damn, my dreams were quickly slipping away.

## Enter Vercel

I had known that Vercel hosting supported `next/image` out of the box, but that alone had never been enough of a reason to switch. However, after testing out the Image component from the Vercel team I'm mighty impressed. It's not *perfect*, I don't like that it automatically adds two divs to handle the layout requirements. I understand why, but wish it was configurable. Other than that, since it's a low-level component it doesn't handle cropping or any pre-processing of the image. That's fine, that really is the cherry on the top, effortless responsive images is what I'm really after. The Image component also works with external images, which is phenomenal, so much power with very little effort - *if* you drink the kool-aid.

I poked around vercel.com, signed up, and had this site up and running in less than 5 minutes. So far so good. I spun up the Vercel-hosted site on its own git branch, so I went ahead and replaced my hand-strung responsive image solution with the Image component. I always enjoy deleting code while adding functionality, the refactor was quite simple. I did have to figure out exactly how to get the image to behave as I wanted responsively with the `layout="fill"` property, but that took all of 5 minutes as well.

## The dust clears

I sought out seeking an improved DX for my image handling. I also was unwilling to compromise on the DX I had already obtained via Netlify and my existing toolchain. Turns out, Vercel fit the bill and then some. Again, I would recommend Netlify to anyone and everyone, at anytime. Except if something like `next/image` interests you. Then using Vercel just makes everything so much easier. Both companies have very generous free hosting packages for small sites like this, which just goes to show how much they value their users.

I will also say another upside to Vercel is it supports 100% of NextJS, which Netlify does not do, it's not just the Image component. This makes sense as Vercel built NextJS (or is it the other way around). If you're taking advantage of the full power of NextJS, Vercel or a custom NodeJS hosting solution is the right move regardless of media handling requirements.