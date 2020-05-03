import { FluentParser } from '@fluent/syntax'
import { fromEntries } from '../helpers'
import listMessagesVariables from './list-messages-variables'

type GlobalState = {
  messages: {
    [ftlPath in string]: {
      [messageIdentifier in string]: MessageVariable[]
    }
  }
}

const initialState = (): GlobalState => ({
  messages: {},
})

let globalState = initialState()

type UpdateGlobalStateParams = (
  { type: 'addContent', payload: CliFluentFile } |
  { type: 'updateContent', payload: CliFluentFile } |
  { type: 'reset' }
)
const updateGlobalState = (params: UpdateGlobalStateParams) => {
  if (params.type === 'addContent') {
    const { payload } = params

    const parser = new FluentParser({ withSpans: false })
    const ast = parser.parse(payload.content)

    Object.entries(listMessagesVariables(ast))
      .forEach(([name, variables]) => {
        if (globalState.messages[name] === undefined) {
          globalState.messages[name] = {}
        }

        globalState.messages[name][payload.path] = variables
      })

    return
  }

  if (params.type === 'updateContent') {
    const { payload } = params

    const parser = new FluentParser({ withSpans: false })
    const ast = parser.parse(payload.content)

    const messagesVariables = listMessagesVariables(ast)

    // Remove messages not used anymore
    const messagesNamesInUse = new Set(Object.keys(messagesVariables))
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
    Object.entries(messagesVariables)
      .forEach(([name, variables]) => {
        if (globalState.messages[name] === undefined) {
          globalState.messages[name] = {}
        }

        globalState.messages[name][payload.path] = variables
      })

    return
  }

  if (params.type === 'reset') {
    globalState = initialState()
    return
  }
}

const getMessagesVariables = (): MessageVariablesMap => {
  const entries = Object.entries(globalState.messages)
    .map(([message, filesToVariable]) => {
      const variablesSet = new Set(
        Object.values(filesToVariable).flat()
      )
      const variablesArray = Array
        .from(variablesSet)
        .sort()

      return [message, variablesArray] as [string, MessageVariable[]]
    })

  const messageVariables = fromEntries(entries)

  return messageVariables
}

export { updateGlobalState, getMessagesVariables }
