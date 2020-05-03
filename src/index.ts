import build from './build'
import { updateGlobalState } from './global-state'

const start = (files: CliFluentFile[]) =>
  files.forEach(file => updateGlobalState({ type: 'addContent', payload: file }))

const buildFluentTypeModule = (file: CliFluentFile) => {
  updateGlobalState({ type: 'updateContent', payload: file })
  const fluentTypeModule = build()
  return fluentTypeModule
}

// TODO: is necessary to export as common js to be available to cli.js
// but probably there are better approach to do that
module.exports = { start, buildFluentTypeModule }
