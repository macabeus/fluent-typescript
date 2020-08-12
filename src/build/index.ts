import dedent from 'dedent-js'
import buildHeader from './header'
import buildTypeMessagesKey from './type-messages-key'
import buildTypePatternArguments from './type-pattern-arguments'
import { getMessagesVariables } from '../global-state'

const build = (target: TargetsSupported) => {
  const messagesVariables = getMessagesVariables()

  const fluentTypeModule = dedent`
    ${buildHeader(target, messagesVariables)}
    ${buildTypeMessagesKey(messagesVariables)}
    ${buildTypePatternArguments(messagesVariables)}
  `

  return fluentTypeModule
}

export default build
