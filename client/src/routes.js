import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { DialogPage } from './pages/DialogPage'
export const useRoutes = () => {
  const [name, setName] = useState('')
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage setName={setName} name={name} />
      </Route>
      <Route path="/dialog/:id">
        <DialogPage setName={setName} name={name} />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  )
}
