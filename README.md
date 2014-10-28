#Node Flux React Boilerplate

##Install

1. npm install
2. grunt start

running `grunt start` will start a node server using
[nodemon](https://github.com/remy/nodemon) which will restart 
the server when changes are made. 

`grunt start` will also run watch in concurrency

`watch` is responsible for four tasks

1. Monitors changes in application javascript
    - Bundles JS using [browserify](http://browserify.org/)
    - [JSHint](http://www.jshint.com/about/) application

2. Monitors changes in node server
    - Restarts server
    - JSHint server

3. Monitors SASS
    - Compiles all sass into css

4. Monitors assests
    - Copys all assets into a public directory


