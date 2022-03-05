import React from 'react'
import Wrapper from './components/Wrapper'

function NewEventsEmail({
  name
}: {
  name: string
}) {
  return (
    <Wrapper>
      <table width="100%" className="w-full max-w-2xl shadow-sm">
        <tr>
          <td>
            <h1 className="text-green-400">Hello {name}</h1>
          </td>
        </tr>
      </table>
    </Wrapper>
  )
}

export default NewEventsEmail
