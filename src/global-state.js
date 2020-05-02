import { FluentParser } from '@fluent/syntax'
import { fromEntries } from './helpers'

const initialState = () => ({
  messages: {},
})

let globalState = initialState()

const messageVariablesName = (message) =>
  message.value.elements
    .filter(element => element.type === 'Placeable')
    .filter(placeable => placeable.expression.type === 'VariableReference')
    .map(placeable => placeable.expression.id.name)

const updateGlobalState = (type, payload) => {
  if (type === 'addContent') {
    const parser = new FluentParser({ withSpans: false })
    const ast = parser.parse(payload.content)

    ast
      .body
      .filter(node => node.type === 'Message')
      .map(message => [message.id.name, messageVariablesName(message)])
      .forEach(([name, variables]) => {
        if (globalState.messages[name] === undefined) {
          globalState.messages[name] = {}
        }

        globalState.messages[name][payload.path] = variables
      })

    return
  }

  if (type === 'updateContent') {
    const parser = new FluentParser({ withSpans: false })
    const ast = parser.parse(payload.content)

    const messagesVariable = ast
      .body
      .filter(node => node.type === 'Message')
      .map(message => [message.id.name, messageVariablesName(message)])

    // Remove messages not used anymore
    const messagesNamesInUse = new Set(messagesVariable.map(([name]) => name))
    Object.keys(globalState.messages)
      .forEach(name => {
        if (messagesNamesInUse.has(name) === false) {
          delete globalState.messages[name][payload.path]

          if (Object.keys(globalState.messages[name]).length === 0) {
            delete globalState.messages[name]
          }
        }
      })

    // Update messages
    messagesVariable
      .forEach(([name, variables]) => {
        if (globalState.messages[name] === undefined) {
          globalState.messages[name] = {}
        }

        globalState.messages[name][payload.path] = variables
      })

    return
  }

  if (type === 'reset') {
    globalState = initialState()
    return
  }
}

const getMessagesVariables = () => {
  const entries = Object.entries(globalState.messages)
    .map(([message, filesToVariable]) => {
      const variablesSet = new Set(
        Object.values(filesToVariable).flat()
      )
      const variablesArray = Array
        .from(variablesSet)
        .sort()

      return [message, variablesArray]
    })

  const messageVariables = fromEntries(entries)

  return messageVariables
}

export { updateGlobalState, getMessagesVariables }
