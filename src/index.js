import { FluentResource } from '@fluent/bundle'
import dedent from 'dedent-js'
import buildHeader from './build-header'
import buildTypeMessagesKey from './build-type-messages-key'
import buildTypePatternArguments from './build-type-pattern-arguments'

const buildFluentTypeModule = (content) => {
  const resource = (new FluentResource(content)).body
  const fluentTypeModule = dedent`
    ${buildHeader()}
    ${buildTypeMessagesKey(resource)}
    ${buildTypePatternArguments(resource)}
  `

  return fluentTypeModule
}

// TODO: is necessary to export as common js to be available to cli.js
// but probably there are better approach to do that
module.exports = buildFluentTypeModule
