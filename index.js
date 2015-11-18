var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var restaurantData = [
  {
    title: 'Philz Coffee Sunnyvale',
    distance: '5 minutes driving',
    crowded: 'Crowded - 25 minutes to get your order',
    dataset: {
      url: 'http://www.philzcoffee.com'
    },
    label: 'Philz Coffee Sunnyvale'
  },
  {
    title: 'Philz Coffee Cupertino',
    distance: '10 minutes driving',
    crowded: 'No line - Ready to serve',
    dataset: {
      url: 'http://www.philzcoffee.com'
    },
    label: 'Philz Coffee Cupertino'
  }
];

io.on('connection', function(socket){
  socket.on('restaurant-service', function(data){
    if ('philz coffee'.match(data.toLowerCase())) {
      io.emit('restaurant-data', restaurantData);
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
