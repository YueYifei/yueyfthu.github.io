var http  = require('http'),
  io    = require('socket.io'),
  fs    = require('fs');

//配置
var config = {
  port : 8888
}

http = http.createServer(handler);
http.listen(config.port);
io = io.listen(http);

function handler(req, res) {
  fs.readFile(__dirname+'/client.html',
  function(err, data){
    req.setEncoding(encoding="utf8");
    res.writeHead(200);
    res.end(data);
  });
}

var playerNum = 0;
var roomNum = 0;
var mapJson = '';
function getMap(str) {
  var tem = fs.readFileSync(__dirname+str, 'utf8');
  tem = JSON.parse(tem);
  tem.suslikX = getRandom(tem.hori-0)+"";
  tem.suslikY = getRandom(tem.vert-0)+"";
  return tem;
}

function getRandom(n){//返回[0, n)区间内的随机整数
  if(n >= 0){
    var res = Math.floor(Math.random()*(n));
    return res;
  }
}

//'connection' 是socket.io 保留的，不能错哦
io.sockets.on('connection',function(socket){ 
   //'map'是地图的信息，客户端开始绘图，但是不发送任何信息
   socket.on('mode', function(data) {
    if (data == '1') {
      socket.emit('map', getMap('/json.json'));
    }
    else if (data == '2') {
      socket.emit('map', getMap('/json.json'));
    }
    else if (data == '3') {
      if (playerNum == 0) {
        playerNum++;
        socket.join(String(roomNum));
        socket.emit('subscribe',{"room" : String(roomNum), "playerId" : "0"});
        mapJson = getMap('/json.json');
        socket.emit('map',mapJson);
        
      }
      else if (playerNum == 1) {
        socket.join(String(roomNum));
        socket.emit('subscribe',{"room" : String(roomNum), "playerId" : "1"});
        socket.emit('map',mapJson);
        socket.emit('begin', {"curPlayer" : "0"});
        socket.broadcast.to(String(roomNum)).emit('begin', {"curPlayer" : "0"});
        playerNum = 0;
        roomNum++;
     }
    }
   })
   
   //'msg'需要和客户端发送时定义的事件名相同

  socket.on('click',function(data){
    console.log(data.room);
    socket.broadcast.to(data.room).emit('click', data);
  });
  socket.on('end',function(data){
    socket.broadcast.to(data.room).emit('end', data);
  });
});