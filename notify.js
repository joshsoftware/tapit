var express = require('express')
  , app = express.createServer()
  , redis = require('redis')
  , io = require('socket.io').listen(app);

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.listen(process.env.PORT || 3000);

function get_redis_connection() {
  if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var db = redis.createClient(rtg.port, rtg.hostname);
    db.auth(rtg.auth.split(":")[1]);

    return db;
  } else {
    // Development or local machine
    return redis.createClient();
  }
}

const DB = get_redis_connection();

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/games/new', function (req, res) {
  data = { gameid: Math.random().toString(36).substring(12) }

  // Create the game in DB
  DB.sadd('games', data['gameid']);
  res.render('games/new', data);
});

app.get('/game/:gameid/:nick', function (req, res) {
  if (!DB.sismember('games', req.params.gameid))
    res.send("No such game", 404);
  else {
    DB.sadd(req.params.gameid, req.params.nick)
    params = { gameid: req.params.gameid,
               nick: req.params.nick,
               ts: Date.now()
    }
    res.render('games/join', params);
  }
});


io.sockets.on('connection', function(socket) {
  console.log("connected..");
  const subscribe = get_redis_connection();
  const publish = get_redis_connection();

  socket.on('publish', function(channel, data) {
    publish.publish(channel, data);
  });

  socket.on('psubscribe', function(channel) {
    console.log('subscribe: ' + channel);
    subscribe.psubscribe(channel);
  });

  subscribe.on("pmessage", function(pattern, channel, message) {
    socket.emit('message', { channel: channel, data:  message });
  });

});
