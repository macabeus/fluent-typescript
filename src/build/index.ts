import dedent from 'dedent-js'
import buildHeader from './header'
import buildTypeMessagesKey from './type-messages-key'
import buildTypePatternArguments from './type-pattern-arguments'
import { getMessagesVariables } from '../global-state'
import { chunk } from '../helpers'

const defaultChuckSize = 25

const build = (target: TargetsSupported, { chuckSize = defaultChuckSize } = {}) => {
  const messagesVariables = getMessagesVariables()
  const messagesVariablesEntries = Object.entries(messagesVariables)
  const messagesVariablesChunks = chunk(messagesVariablesEntries, chuckSize)

  const fluentTypeModule = dedent`
    ${buildHeader(target, messagesVariablesChunks)}
    ${buildTypeMessagesKey(messagesVariablesChunks)}
    ${buildTypePatternArguments(messagesVariablesChunks)}
  `

  return fluentTypeModule
}

export default build
