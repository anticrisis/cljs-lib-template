# How to build ClojureScript libraries for nodejs

It's 2017, and I wasn't able to find a simple tutorial to using ClojureScript inside a JavaScript nodejs project. There were a few demonstrations of using node to run a ClojureScript project, but what if I just want to build a ClojureScript library into an existing node app?

I expect this basic tooling will come in handy for building business logic libraries in ClojureScript and integrating those libraries into existing JavaScript frameworks like React, Electron or other fancy fancies.

## Dependencies
- `npm`
  - Development dependencies:
  - `shelljs`
  - `minimist`

That's all. No Leinengen, Boot, Grunt, Babel, and who knows what else.

For fun, read [How it feels to learn JavaScript in 2016](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f). This is not that.

## Requirements
- `java` on your path

## Usage
1. Download the standalone [ClojureScript](https://clojurescript.org/) JAR from [Github](https://github.com/clojure/clojurescript/releases/latest).

2. Place the `cljs.jar` file in the `cljs-support` directory.

3. Type
```
npm install
npm run release
```

This will generate the file `my_lib.js` in the `out` directory. You can use it like this:

```
$ node
> l = require('./out/my_lib');
{ core: { ping: [Function: G] } }
> l.core.ping();
'pong'
>
```

## How it works
The ClojureScript JAR is used to build your ClojureScript code, minimize and eliminate all the dead code using the Google Closure Library, and a release script is used to [wrap](https://github.com/swannodette/mori/tree/master/support) everything up so it can be found by CommonJS, RequireJS and HTML.
