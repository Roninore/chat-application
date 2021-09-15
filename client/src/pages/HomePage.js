import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { EnterName } from '../components/EnterName'

export const HomePage = ({ setName }) => {
  const [form, setForm] = useState({ text: '' })
  const { request } = useHttp()
  const history = useHistory()
  const changeHandler = (event) => {
    //control input function
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  const goToDialog = useCallback(async () => {
    //generate id and redirect to dialog
    if (!form.text || form.text === ' ') return
    setName(form.text)
    const { id } = await request('/api/createDialog', 'GET', null, {})
    history.push(`/dialog/${id}`)
  }, [form, setName, request, history])
  return (
    <EnterName
      changeHandler={changeHandler}
      submitHandler={goToDialog}
      valueVar={form.text}
    />
  )
}
