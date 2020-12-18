---
title: Webpack code splitting with Create React App and React Router
description:
  Learn how to leverage Webpack's native code splitting ability with Create
  React App and React Router
date: '2016-11-14T11:00:00Z'
comments: true
---

When building a modern [React](https://facebook.github.io/react/) application, the sanest starting point is Facebook's official [Create React App](https://github.com/facebookincubator/create-react-app). It's well documented, well built, and makes getting started building with React simple and streamlined. Their custom [Webpack](https://webpack.github.io/) configuration is everything you need to get started, from Hot Module Reloading, to production minification and gzipping. One of the things they don't outline, however, and is super vital to production-quality applications is **code splitting**. This is the process of breaking up your JavaScript to only load what is necessary, and async load in the rest.

[Code Splitting](http://webpack.github.io/docs/code-splitting.html) is a default feature of Webpack, it's just not built into Create React App, and for good reason. React by default is the view layer to your application, it doesn't care about routes, or chunks, or anything else really. Enter [React Router](https://github.com/ReactTraining/react-router). Used on ~40% of React applications, React Router is the most popular routing solution for React. They make **dynamic routes** and **route-based code splitting** exceedingly straight forward. In fact, **simply copying the technique from their "Huge Apps" example works out of the box with Create React App.** That's right, if you're familiar with declarative route-based splitting with React Router already, then you can stop reading and start splitting!

If you're still with me, I'm talking about this example here: [Huge Apps](https://github.com/ReactTraining/react-router/tree/master/examples/huge-apps). This awesome repository is all that we need to get code splitting up and working with any Create React App application. The process involves two steps: segmenting your route components from core components, and utilizing `getComponent` with `require.ensure`. It's very straight forward, the guys at ReactTraining outline it well here: [Dynamic Routing](https://github.com/ReactTraining/react-router/blob/master/docs/guides/DynamicRouting.md).

Your `rootRoute` object would look similar to this:

```javascript
const rootRoute = {
  childRoutes: [
    {
      path: '/',
      component: require('./components/App'),
      childRoutes: [
        require('./routes/Calendar'),
        require('./routes/Course'),
        require('./routes/Grades'),
        require('./routes/Messages'),
        require('./routes/Profile'),
      ],
    },
  ],
};
```

This contains the parent `App` component, and all the primary child routes of your application. This commonly lives in `App.js` or `/config/routes.js`.

The rest of your folder structure would look something like this:

```markup
/src
  index.js
  /components
    App.js
    Calendar.js
  /routes
    /Calendar
      index.js

```

An example individual route index file looks like:

```javascript
module.exports = {
  path: 'calendar',

  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require('./components/Calendar'));
    });
  },
};
```

And that's it! The `getComponent` function allows us to call the require.ensure function to load our route component only when needed. Again, this is just leveraging built in Webpack functionality.

Super straight forward technique that I use on every create react app build (that uses React Router 2/3 at least!). This could be more concise with the `bundle-loader` Webpack plugin, but that would require us to eject Create React App. Still, using this method saved me over 60% on my initial JS load! It's too easy to not use.
