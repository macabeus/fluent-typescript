import build from './build'
import { updateGlobalState } from './global-state'

const start = (files: CliFluentFile[]) =>
  files.forEach(file => updateGlobalState({ type: 'addContent', payload: file }))

const updateContent = (file: CliFluentFile) =>
  updateGlobalState({ type: 'updateContent', payload: file })

const buildFluentTypeModule = build

const targetsSupported: Array<TargetsSupported> = ['vanilla', 'react-18next', 'fluent-react']

// TODO: is necessary to export as common js to be available to cli.js
// but probably there are better approach to do that
module.exports = { start, updateContent, buildFluentTypeModule, targetsSupported }
