const Router = require('express')
const router = Router()

const createDialog = require('./requests/createDialog.js')
router.get('/createdialog', createDialog)

const sendMessage = require('./requests/sendMessage.js')
router.post('/sendmessage', sendMessage)

const getDialog = require('./requests/getDialog.js')
router.get('/getdialog/:id', getDialog)
module.exports = router
