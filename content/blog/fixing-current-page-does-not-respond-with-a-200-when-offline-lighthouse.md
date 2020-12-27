---
title: Fixing "Current page does not respond with a 200 when offline" from
  Lighthouse Audit
description: I recently ran into an issue where lighthouse was telling me my
  site was not available when offline. Here's how I ended up fixing it.
image: /uploads/jeshoots-com-2vd8lihdnw-unsplash.jpg
date: 2020-01-29T09:23:42-0500
comments: true
---

**tl:dr;** Turn off "Bypass for Network" in the Service Worker section of the Application Tab in Chrome dev tools.

While working on Final Round, I was running lighthouse audits and was increasingly frustrated by the audit telling me "Current page does not respond with a 200 when offline". This was despite the fact that I had a running Service Worker and a valid Web Manifest file. No matter how I tweaked the settings, I was unable to fix this error. The other frustrating part was I _swore_ this was working not too long ago.

> **Note:** I'm using the [Next Offline](https://github.com/hanford/next-offline) package. This post is addressed the issue of having a Service Worker and Manifest file set up, yet still receiving this error. If you're not sure if you have the required files set up already, read [this article](https://codelabs.developers.google.com/codelabs/your-first-pwapp).

So, after downgrading Next, downgrading Next Offline, using canaries to no avail, I finally found the issue. And wouldn't you know it, it was a stupid little checkbox.

<p>
  <img
    src="/uploads/bypass-for-network-wtf.jpg"
    alt="The Culprit; Bypass for Network"
  />
</p>

Inside the "Application" tab in the Chrome developer settings is the service worker section. Here, at the top of the panel are three options - one of them titled "Bypass for Network", which on hover reads "Bypass the service worker and load resources from the Network". Now, I don't know if I turned this on, if this is a default setting, or what, but this setting is the culprit. This seems to be an omnipresent setting, and while running an audit if this is checked you will not access your service worker cache and you will receive the lighthouse error that I did. **Unchecking this option** will access the worker cache properly and all should be well.

And that's it. Hours and hours of debugging, tweaking, and issue queue perusing, and it was a damn checkbox. Gotta love developing.
