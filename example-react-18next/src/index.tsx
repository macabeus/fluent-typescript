import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './i18n'
import Hello from './components/hello'

const App = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <div>
      <Hello />
    </div>
  </Suspense>
)

ReactDOM.render(<App />, document.getElementById('app'))
