var DELIMITER = '\r\n'
var BAUDRATE = 9600
var SERIAL_DEVICE = '/dev/ttyS0'

var buffer = ''

var newMessageCallback = null
var errorCallback = null
var closeCallback = null

var init = function() {
  return new Promise(function(resolve, reject) {
    try {
      var SerialPort = require('serialport').SerialPort

      var serialPort = new SerialPort(SERIAL_DEVICE, {
        baudrate: BAUDRATE
      })
      
      serialPort.on('open', function () {
        serialPort.on('data', function(data) {
          buffer += data.toString()
          var lines = buffer.split(DELIMITER)
          if (!buffer.match(/\r\n$/)) {
            buffer = lines.pop()
          } else {
            buffer = ''
          }
          
          lines.forEach(function(line) {
            newMessageCallback(line)
          })
        })
      })

      serialPort.on('error', errorCallback)
      serialPort.on('close', closeCallback)

      resolve(serialPort)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  init: init,
  newMessage: function(callback) {
    newMessageCallback = callback
  },
  error: function(callback) {
    errorCallback = callback
  },
  close: function(callback) {
    closeCallback = callback
  },
}