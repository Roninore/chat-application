import React from 'react'

export const Input = ({ changeHandler, submitHandler, valueVar }) => {
  return (
    <>
      <input
        type="text"
        className="white-input col s10"
        name="text"
        value={valueVar}
        onChange={changeHandler}
      />
      <div className="col s2">
        <button
          className="btn waves-effect waves-light purple lighten-1"
          type="submit"
          name="action"
          onClick={submitHandler}
        >
          Submit
        </button>
      </div>
    </>
  )
}
