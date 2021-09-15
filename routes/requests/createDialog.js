const dialog = require('../../models/dialog.js')
const uniqid = require('uniqid')

const createDialog = async (req, res) => {
  try {
    const id = uniqid()
    const newDialog = new dialog({ id, messages: [] })
    await newDialog.save()
    res.status(201).json({ id })
  } catch (e) {
    res.status(500).json({ message: 'Error on create dialog' })
  }
}

module.exports = createDialog
