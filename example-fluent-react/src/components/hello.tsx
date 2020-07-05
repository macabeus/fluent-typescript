import React, { useState } from 'react'
import { Localized } from '@fluent/react'

const Hello = () => {
  const [userName, setUserName] = useState('')

  const names = userName.split(' ')
  const firstName = names[0]
  const lastName = names[names.length - 1]

  return (
    <div>
      {
        userName
          ?
          <Localized id='hello' vars={{ firstName, lastName }}>
            <h1>Hello!</h1>
          </Localized>
          :
          <Localized id='hello-no-name'>
            <h1>Hello, stranger!</h1>
          </Localized>
      }

      <Localized id='type-name' attrs={{ placeholder: true }}>
        <input
          type='text'
          placeholder='Type your name'
          onChange={evt => setUserName(evt.target.value)}
          value={userName}
        />
      </Localized>
    </div>
  )
}

export default Hello
