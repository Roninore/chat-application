import React, { useEffect } from 'react'
import M from 'materialize-css'

export const ConnectedUsers = ({ users }) => {
  useEffect(() => {
    M.AutoInit()
  }, [users])
  return (
    <div className="input-field col s12">
      <select className="text" defaultValue="0">
        <option value="0" disabled>
          Users in chat
        </option>
        {users.map((user, i) => (
          <option key={i} value={i} disabled>
            {user}
          </option>
        ))}
      </select>
    </div>
  )
}
