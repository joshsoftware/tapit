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

Install [node](http://nodejs.org), [npm](http://npmjs.org) and [Redis](http://redis.io).
Install the node modules when you clone this directory.

    npm install

Because we have the package.json it will automatically installs the dependant npm modules.

Playing the game
----------------

    $ node notify.js

* Create a new game! [http://localhost:3000/games/new](http://localhost:3000/games/new)
* When a new game is created, it gets a unique id. 
* To join a game, http://host:port/game/:game_id/start
* Enter your handle.
* Dance your heart you!

And if you wanted a live demo - here you are http://tapit.nodejitsu.com 

Contributing
------------

Feel free to fork and add more dance moves - Yeah!

Enjoy!

