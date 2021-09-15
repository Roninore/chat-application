import React from 'react'

export const Message = ({ name, text, time }) => (
  <a href="#!" className="collection-item">
    <div className="row message-body">
      <div className="col s11">
        <p className="message-sender">{name}</p>
        <p className="message-text">{text}</p>
      </div>
      <div className="col s1">{time}</div>
    </div>
  </a>
)
