---
title: "Ethical Analytics: Replacing Google Analytics with Plausible.io"
description: The web should be more than just Google and I'm ditching Google
  Analytics for Plausible, an excellent and ethical alternative.
image: /uploads/mike-petrucci-c9fqyqiecds-unsplash.jpg
date: 2020-12-28T17:12:57.537Z
comments: true
---
I'm [not](https://nomoregoogle.com/) [alone](https://dev.to/goatandsheep/stop-donating-your-customers-data-to-google-analytics-191) in the sentiment, in fact I'm late, that Google should not own the web. Their products and tools have become so ubiquitous that the monopoly they have created has caused irreparable harm to small businesses. Creating a digital _anything_ company essentially means competing with a Google product backed by one of the wealthiest companies on the planet, or at the very least spending your early capital on their SaaS.

One of the best things we as individuals can do is to vote with our pockets and **stop using Google products**. This can be easy, or challenging, depending on your level of integration with Google, but we can start small. My first step is to stop using Google Analytics to track my visitors on this website.

## Replacing Google Analytics

Ironically, I began my search by using google.com to search for "Ethical web analytics". I stumbled a bit to find the right wording for what I was looking for, but that was more-or-less it. I quickly found this excellent mini-series on [mentalpivot.com](https://mentalpivot.com/), if you're reading this post, I would really recommend these posts:

1. [Ethical Web Analytics: Alternatives to Google](https://mentalpivot.com/ethical-web-analytics-alternatives-google)
2. [A Plausible Choice: An Ethical Web Analytics Followup](https://mentalpivot.com/pleased-with-plausible-a-followup-on-ethical-web-analytics)

This was exactly the process I was going through. Their eventual choice was [plausible.io](https://plausible.io/), and this was actually a service I had briefly ran into before. Truly the only thing standing in my way for signing up when I first encountered it was the price tag. $48 USD at the time was just enough to keep me using the free Google Analytics product, but I was ready to pay what I felt was a reasonable price.

## What I even want analytics for

I really don't care about my users' data, I care about my content. I want to know how popular my content is, how it performs, and some high-level funnels. I want to know how people find me, and what they do when they're on my site. I don't want to know anything about them at all, and I don't want to monetize them. Maybe one day if I were trying to make content creation a side gig I would investigate ethical advertisements, but until then I want to see what kind of organic traction my content might have.

Google Analytics might do that, but behind the scenes it does so much more. Essentially I'm forwarding my traffic to Google servers for them to do with what they please. I don't like this, and I don't need this. Replacing GA with a product that provides me insight into my website without abusing my users is a very easy decision to make.

## Getting started with plausible.io

Really there's not much to say, they have made the new user process rather straight forward. They provide a free 30 day trial with no credit card required. You sign up with your email, and they provide you a single JavaScript `<script>` tag to include in your site's `<head>`. The script automatically captures client-side navigations, so I actually got to delete a bit of code that was listening to router events and triggering manual page events. That bit was a very nice upside to replacing Google Analytics with Plausible.

The Plausible dashboard is great, looks modern, the charts are concise and display the exact data I'm most concerned with. My only concern may be that it is a small team powering the product, perhaps with a small bus factor. However, I'm confident that I could switch products easily (even back to Google Analytics) if necessary, so it doesn't feel like a very big risk.

## "Free" software

I had this aversion to paying for software that I could get for free. Or even paying for software for a project that does not generate revenue. Ideally I would pay for as little as possible and I still believe that. However, I need to normalize paying small fees for software I find usable. The reliance on open source and freemium software have driven society into this predicament where we have forfeited our data to avoid paying service fees. The problem is most people don't realize how valuable their own data is. The large companies do know, and they've known for a while, and they have completely capitalized on our tendencies and have essentially stolen the rights to our own data. Time to fight back, and paying for quality software from individuals is a great way to start. Buy local.

For more Google alternatives, check out [https://nomoregoogle.com/](https://nomoregoogle.com/)