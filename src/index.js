import { FluentParser } from '@fluent/syntax'
import dedent from 'dedent-js'
import buildHeader from './build-header'
import buildTypeMessagesKey from './build-type-messages-key'
import buildTypePatternArguments from './build-type-pattern-arguments'

const buildFluentTypeModule = (content) => {
  const parser = new FluentParser({ withSpans: false })
  const ast = parser.parse(content)

  const fluentTypeModule = dedent`
    ${buildHeader()}
    ${buildTypeMessagesKey(ast)}
    ${buildTypePatternArguments(ast)}
  `

  return fluentTypeModule
}

// TODO: is necessary to export as common js to be available to cli.js
// but probably there are better approach to do that
module.exports = buildFluentTypeModule
