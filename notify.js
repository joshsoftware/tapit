/** CONFIGURATION **/

//HOST = "192.168.1.153",
HOST = "localhost",
PORT = "3001"

/** CONFIGURATION **/

var express = require('express')
  , app = express.createServer()
  , redis = require('redis')
  , io = require('socket.io').listen(app);

io.set('log level', 1); // reduce logging

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.listen(PORT);

const DB = redis.createClient();

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/games/new', function (req, res) {
  data = { HOST: HOST, PORT: PORT,
          gameid: Math.random().toString(36).substring(12) 
  }

  // Create the game in DB
  DB.sadd('games', data['gameid']);
  res.render('games/new', data);
});

app.get('/game/:gameid/:nick', function (req, res) {
  DB.sismember('games', req.params.gameid, function(err, data) {

    // Game Not found
    if (!data) return res.send(404);

    // Strip special characters
    nick = req.params.nick.replace(/\W/g, '')
    DB.sismember(req.params.gameid, nick, function(err, data) {
      // Add the new member to the game
      DB.sadd(req.params.gameid, nick);
      params = { HOST: HOST, PORT: PORT,
                gameid: req.params.gameid,
                nick: nick,
                ts: Date.now()
      }
      res.render('games/join', params);
    });
  });
});

io.sockets.on('connection', function(socket) {
  const subscribe = redis.createClient();
  const publish = redis.createClient();

  socket.on('publish', function(channel, data) {
    publish.publish(channel, data);
  });

  socket.on('psubscribe', function(channel) {
    subscribe.psubscribe(channel);
  });

  subscribe.on("pmessage", function(pattern, channel, message) {
    socket.emit('message', { channel: channel, data:  message });
  });

});
