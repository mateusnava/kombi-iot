var http = require('http')
var fs = require('fs')

var dataMessage = null

var renderFile = function(path, response) {
  console.log('Render file ' + path)
  if (fs.existsSync(path)) {
    if (path.indexOf('.js') >= 0) {
      response.setHeader('Content-Type', 'text/javascript')
    } else if (path.indexOf('.html') >= 0) {
      response.setHeader('Content-Type', 'text/html')
    } else if (path.indexOf('.png') >= 0) {
      response.setHeader('Content-Type', 'image/png')
    } else if (path.indexOf('.json') >= 0) {
      response.setHeader('Content-Type', 'application/json')
    }
    var content = fs.readFileSync(path)
    response.write(content)
  } else {
    response.writeHead(404);
  }
  response.end();
}

var renderPublic = function(url, response) {
  renderFile('./public' + url, response)
}

var renderAsset = function(url, response) {
  renderFile('.' + url, response)
}

var renderData = function(response) {
  response.setHeader('Content-Type', 'application/json')
  response.end(dataMessage)
}

var start = function(port) {
  http.createServer(function(request, response) {
    var url = request.url
    console.log('Request ' + url)

    if (url.indexOf('assets') >= 0) {
      renderAsset(url, response);
      return;
    }
  
    if (url.indexOf('data') >= 0) {
      renderData(response);
      return;
    }
    if (url == '/') {
      renderAsset('/assets/index.html', response);
      return
    }

    renderPublic(url, response)
  }.bind(this)).listen(port);
  
  console.log('Listening on port ' + port + ' ...');
}

module.exports = {
  start: start,
  setData: function(data) {
    dataMessage = data
  }
}

// start(8080);