import build from './build'
import { updateGlobalState } from './global-state'

const start = files =>
  files.forEach(file => updateGlobalState('addContent', file))

const buildFluentTypeModule = file => {
  updateGlobalState('updateContent', file)
  const fluentTypeModule = build()
  return fluentTypeModule
}

// TODO: is necessary to export as common js to be available to cli.js
// but probably there are better approach to do that
module.exports = { start, buildFluentTypeModule }
