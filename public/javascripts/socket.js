$(document).ready(function() {
    var socket = new io.Socket('localhost', {port: 3000, rememberTransport: false/*, transports: ['xhr-polling']*/});
    var content = $('#content');

    socket.on('connect', function() {
    });

    socket.on('message', function(message){
        content.prepend(message + '<br />');
    }) ;

    socket.on('disconnect', function() {
        console.log('disconnected');
        content.html("<b>Disconnected!</b>");
    });

    socket.connect();
});
