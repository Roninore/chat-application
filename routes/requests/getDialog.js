const dialog = require('../../models/dialog.js')
const rooms = require('../../temp/rooms')

const getDialog = async (req, res) => {
  try {
    const findedDialog = await dialog.findOne({ id: req.params.id })
    if (!findedDialog) {
      res.status(404).json({ message: 'Not found' })
      return
    }
    const users = rooms[req.params.id].map((item) => {
      return item.name
    })
    res.status(200).json({ messages: findedDialog.messages, users })
  } catch (e) {
    res.status(500).json({ message: 'Error on get dialog!' })
  }
}

module.exports = getDialog
