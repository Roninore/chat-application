import { io } from 'socket.io-client'

const options = {
  'force new connection': true,
  reconnectionAttempts: 'Infinity',
  transports: ['websocket'],
}

const socket = io('http://localhost:80', options)

export default socket
