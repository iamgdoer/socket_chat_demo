const app = require('http').createServer()
const io = require('socket.io')(app, {origins: '*:*'})


let PORT = 3000

app.listen(PORT)

io.on('connection', (socket) => {
    socket.on('login', (user) => {
        socket.user = user
        socket.emit('ownLogin', 'welcome to Websocket Chat ' + user)
        io.emit('user come in', user + ' comes in')
    })

    socket.on('message', (mess) => {
        io.emit('message', {user: socket.user, mess: mess})
    })

    socket.on('disconnect', () => {
        io.emit('leave', socket.user + ' left')
    })
})

console.log('server run at ' + PORT)