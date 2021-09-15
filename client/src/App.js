import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'materialize-css'
import { useHttp } from './hooks/http.hook'
import { useRoutes } from './routes'
function App() {
  const { loading } = useHttp()
  const routes = useRoutes()
  return (
    <>
      <Router>
        <div className="content">{!loading && routes}</div>
      </Router>
    </>
  )
}

export default App
