var serial = require('./serial')
var server = require('./server')

server.start(8080)

serial.newMessage(function(message) {
  if (message) {
    server.setData(message)
  }
  console.log(message)
})
serial.error(function(error) {
  console.error(error)
  process.exit(1)
})
serial.close(function() {
  console.error('Close serial port')
  process.exit(1)
})

serial.init().then(function() {
  console.log('Serial is open')
}, function(error) {
  console.error(error)
  process.exit(1)
})