import React from 'react'

import { useMyHook } from 'react-use-pagination'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
