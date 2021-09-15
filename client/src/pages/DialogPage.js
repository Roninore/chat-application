import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { Messages } from '../components/Messages'
import { Input } from '../components/Input'
import { EnterName } from '../components/EnterName'
import socket from '../socket/socket'
import { ConnectedUsers } from '../components/ConnectedUsers'

export const DialogPage = (props) => {
  const { request, loading } = useHttp()
  const [dialog, setDialog] = useState([]) //dialog messages
  const [form, setForm] = useState({ text: '' }) //message form
  const dialogId = useParams().id
  const [users, setUsers] = useState([]) //connected users

  const changeHandler = (event) => {
    //control message form
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const enterHandler = useCallback(() => {
    //enter name (if not selected)
    props.setName(form.text)
  }, [form])

  const getDialog = useCallback(async () => {
    //get messages and connected users
    try {
      const answer = await request(
        `/api/getdialog/${dialogId}`,
        'GET',
        null,
        {}
      )
      setDialog(answer.messages)
      setUsers(answer.users)
    } catch (e) {
      console.log(e)
    }
  }, [dialogId, request])

  const sendMessage = useCallback(async () => {
    //send message handler
    const nowDate = new Date(Date.now())
    const stringDate = `${nowDate.getHours()}:${nowDate.getMinutes()}`
    const newMessage = { name: props.name, text: form.text, time: stringDate }
    await request('/api/sendmessage', 'POST', null, {
      name: encodeURI(newMessage.name),
      text: encodeURI(newMessage.text),
      time: newMessage.time,
      id: dialogId,
    })
  }, [dialogId, form, request, props])

  useEffect(() => {
    getDialog()
  }, [getDialog])

  useEffect(() => {
    //changed user information
    socket.emit('change-userinfo', { name: props.name, dialogId })
  }, [dialogId, props.name])

  useEffect(() => {
    //new message
    socket.on('message', (message) => {
      setDialog([...dialog, message])
    })
    //change connected users list
    socket.on('users', (users) => setUsers(users))
    return function cleanup() {
      socket.removeListener('message')
      socket.removeListener('users')
    }
  }, [dialog, dialogId, props.name])

  if (!props.name)
    //if name not changed - request user
    return (
      <EnterName //form
        changeHandler={changeHandler}
        submitHandler={enterHandler}
        valueVar={form.text}
      />
    )
  return (
    <div className="row">
      <div className="col s6 offset-s3 card-panel">
        <ConnectedUsers users={users} />
        <div className="dialog-header">
          <h4>Dialog #{dialogId}</h4>
        </div>
        <div className="dialog">
          <div className="input-field col s12 message-input">
            <Input
              changeHandler={changeHandler}
              submitHandler={sendMessage}
              valueVar={form.text}
            />
            <label htmlFor="name">Message..</label>
            {loading && <Loader />}
          </div>
          <div className="col s12 messages-container">
            <Messages dialog={dialog} />
          </div>
        </div>
      </div>
    </div>
  )
}
