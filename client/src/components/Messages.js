import React, { useEffect, useState, useRef } from 'react'
import { Message } from './Message'

export const Messages = ({ dialog }) => {
  const [messages, setMessages] = useState([]) //message list
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  useEffect(() => {
    setMessages(
      dialog.map((msg, i) => (
        <Message key={i} name={msg.name} text={msg.text} time={msg.time} />
      ))
    )
  }, [dialog])
  return (
    <ul className="collection col s12">
      {messages}
      <li>
        <p className="void" ref={messagesEndRef}></p>
      </li>
    </ul>
  )
}
