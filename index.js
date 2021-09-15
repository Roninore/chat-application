const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const path = require('path')
const apiRoutes = require('./routes/api.routes.js')
const app = express()
const server = require('http').createServer(app)
io = require('socket.io')(server)

app.use(express.json({ extended: true }))
app.use('/api', apiRoutes)
const PORT = config.get('port')
const URL = config.get('url')
const rooms = require('./temp/rooms.js') //socket rooms

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

async function start() {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    server.listen(PORT, () =>
      console.log(`Started, on port: ${PORT}, URL: ${URL}`)
    )
    io.sockets.on('connection', (socket) => {
      let id
      socket.on('change-userinfo', ({ name, dialogId }) => {
        id = dialogId
        if (rooms.hasOwnProperty(id)) {
          if (rooms[id].indexOf(socket) < 0) {
            socket.name = name
            rooms[id] = [...rooms[id], socket]
          } else rooms[id][rooms[id].indexOf(socket)].name = name
        }
        //add socket to room
        else {
          socket.name = name
          rooms[id] = [socket]
        }
        reloadUsers()
      })

      const reloadUsers = () => {
        //reload users in room
        if (!rooms.hasOwnProperty(id)) return
        const users = rooms[id].map((item) => {
          return item.name
        })
        rooms[id].forEach((item) => {
          item.emit('users', users)
        })
      }

      socket.on('disconnect', (data) => {
        if (rooms.hasOwnProperty(id)) {
          rooms[id].splice(rooms[id].indexOf(socket), 1)
          reloadUsers()
          console.log(`deleted - ID:${id}, ${rooms[id].length}`)
        }
      })
    })
  } catch (e) {
    console.log('err', e)
  }
}
start()
