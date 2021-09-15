const dialog = require('../../models/dialog.js')
const rooms = require('../../temp/rooms.js')
const sendMessage = async (req, res) => {
  try {
    const findedDialog = await dialog.findOne({ id: req.headers.id })
    if (!findedDialog) {
      res.status(404).json({ message: 'Not found' })
      return
    }
    const name = decodeURI(req.headers.name)
    const text = decodeURI(req.headers.text)
    const time = req.headers.time
    rooms[req.headers.id].forEach((socket) => {
      socket.emit('message', { name, text, time })
    })

    findedDialog.messages = [...findedDialog.messages, { name, text, time }]
    await findedDialog.save()
    res.status(201).json({ message: 'Sended!' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Error on send message!' })
  }
}

module.exports = sendMessage
