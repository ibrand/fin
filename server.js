const clipList = require('./clipList')
const io = require('socket.io')(8080)
const Session = require('./session')

let session = new Session(clipList, "Now_We_Wait")

io.on('connection', function (socket) {
    if (io.engine.clientsCount === 1) {
        socket.emit('clip', session.node)
    }

    socket.on('finishedClip', function () {
        session.begin()
        let options = Object.keys(session.votes)
        if (options.length === 0) { 
            io.emit('finishedSession')
        } else {
            io.emit('requestVote', options)
            let timer = setTimeout(function () {
                session.end()
                socket.emit('clip', session.node)
            }, 5000)
        }
    })

    socket.on('vote', function (vote) {
        if (session.isVoting) {
            if (session.votes[vote] !== undefined) {
                ++session.votes[vote]
            }
        }
    })
})