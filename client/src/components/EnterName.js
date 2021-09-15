import React from 'react'
import { Input } from './Input'

export const EnterName = ({ changeHandler, submitHandler, valueVar }) => {
  return (
    <div className="row">
      <div className="col s8 offset-s2 card-panel">
        <div className="row">
          <h4>Please enter your name to continue</h4>
          <div className="input-field col s12">
            <Input
              changeHandler={changeHandler}
              submitHandler={submitHandler}
              valueVar={valueVar}
            />
            <label htmlFor="name">Enter your name</label>
          </div>
        </div>
      </div>
    </div>
  )
}
