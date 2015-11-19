var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var restaurantData = [
  {
    name: 'Philz Coffee Sunnyvale',
    location: '41.2625819, -75.5749512',
    distance: '5 minutes driving',
    crowded: true,
    estimatedWaitTime: '25 minutes',
    url: 'http://www.philzcoffee.com'
  },
  {
    name: 'Philz Coffee Cupertino',
    location: '41.2625819, -75.5749512',
    distance: '10 minutes driving',
    crowded: false,
    url: 'http://www.philzcoffee.com'
  }
];

io.on('connection', function(socket){
  socket.on('restaurant-service', function(data){
    var filteredData = restaurantData.filter(function(ele) {
      return ele.name.toLowerCase().match(data.toLowerCase()) ? true : false;
    });
    io.emit('restaurant-data', filteredData);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
