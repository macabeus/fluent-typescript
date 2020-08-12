import dedent from 'dedent-js'
import buildHeader from './header'
import buildTypeMessagesKey from './type-messages-key'
import buildTypePatternArguments from './type-pattern-arguments'
import { getMessagesVariables } from '../global-state'



const build = (target: TargetsSupported) => {
  const messagesVariables = getMessagesVariables()
  const entries = Object.entries(messagesVariables)

  const batchSie = 25
  const numberOfBatches = Math.ceil(Object.keys(messagesVariables).length / batchSie)

  const batches: BatchList = []

  for (let index = 0; index < numberOfBatches; index++) {
    const element = entries.slice(index * batchSie, Math.min((index + 1) * batchSie, entries.length + 1))
    batches[index] = element
  }

  const fluentTypeModule = dedent`
  ${buildHeader(target, batches)}
  ${buildTypeMessagesKey(batches)}
  ${buildTypePatternArguments(batches)}
`

  return fluentTypeModule
}

export default build
