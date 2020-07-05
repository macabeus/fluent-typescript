import React from 'react'
import ReactDOM from 'react-dom'

import AppLocalizationProvider from './l10n'
import Hello from './components/hello'

const App = () => (
  <AppLocalizationProvider>
    <Hello />
  </AppLocalizationProvider>
)

ReactDOM.render(<App />, document.getElementById('app'))
