// var ArduinoFirmata = require('arduino-firmata');
// var arduino = new ArduinoFirmata();
 
// arduino.connect('/dev/ttyS0');
 
// arduino.on('connect', function(){
//   console.log('connected...');
//   console.log("board version"+arduino.boardVersion);

//   arduino.pinMode(13, ArduinoFirmata.OUTPUT);

//   var url = require('url');
//   var http = require('http');

//   http.createServer(function(request, response) {
//     var params = url.parse(request.url, true).query;
//     console.log(params)
//     if (params.value.toLowerCase() == 'high') {
//       arduino.digitalWrite(13, 1);
//     } else {
//       arduino.digitalWrite(13, 0);
//     }
//     response.writeHead(200);
//     response.write("The value written was: " + params.value);
//     response.end();
//   }.bind(this)).listen(8080);

//   console.log('Listening on port 8080 ...');  
// });


var url = require('url');
var http = require('http');
var fs = require('fs');

var renderAsset = function(url, response) {
  var path = `.${url}`
  if (fs.existsSync(path)) {
    if (path.indexOf('.js') >= 0) {
      response.setHeader('Content-Type', 'text/javascript')
    } else if (path.indexOf('.html') >= 0) {
      response.setHeader('Content-Type', 'text/html')
    }
    var content = fs.readFileSync(path)
    response.write(content)
  } else {
    response.writeHead(404);
  }
  response.end();
}

var renderData = function(response) {
  response.setHeader('Content-Type', 'text/html')
}

http.createServer(function(request, response) {
  var url = request.url
  if (url.indexOf('assets') >= 0) {
    renderAsset(url, response);
    return;
  }

  if (url.indexOf('data')) {
    renderData(response);
    return;
  }
  response.writeHead(404);
  response.end();
}.bind(this)).listen(8080);

console.log('Listening on port 8080 ...');  