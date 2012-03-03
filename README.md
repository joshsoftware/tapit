Welcome to TapIt - The NextGen Dance Floor
==========================================

TapIt is a express, socket.io, Redis PubSub powered application.
The aim here was to create a proof-of-concept for probably the
next-generation of interactive web applications.

Primary Goals
------------

* Very very low latency.
* Entirely web-based i.e. no installation required

Architecture
-----------

node - The server-side framework.
express.js - The Web server
socket.io - WebSocket power
Redis Pubsub - Wildcard Push Notification support

## Setting it up

Install [node](http://nodejs.org)
Install [npm](http://npmjs.org)
Install [Redis](http://redis.io)

    npm install

Because we have the package.json it will automatically install the relevant npm modules.

Playing the game
----------------

    $ node notify.js

### Start new game!

[http://localhost:3000/games/new](http://localhost:3000/games/new)

### Join a game

When a new game is created, it spews out a *unique* URL. To join a game, open the url in a new browser window. Be sure to add your own nick in the URL! 

Enjoy!

