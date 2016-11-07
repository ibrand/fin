const io = require('socket.io-client')

let client = io.connect('http://localhost:8080')

client.on('clip', function (clip) {
    console.log('received clip', clip)
    // get clip and watch
    // when done watching emit:
    client.emit('finishedClip')
})

client.on('requestVote', function (options) {
    console.log('vote requested. here are your options:') 
    console.log(options)
    console.log('please vote! you have 10s')
})

client.on('finishedSession', function () {
    console.log('we done')
})

process.stdin.on('data', function (data) {
    client.emit('vote', data.toString().replace(/^\s+|\s+$/g, ''))
})