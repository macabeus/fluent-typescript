import dedent from 'dedent-js'

const messageVariablesName = (message) =>
  message.value.elements
    .filter(element => element.type === 'Placeable')
    .filter(placeable => placeable.expression.type === 'VariableReference')
    .map(placeable => placeable.expression.id.name)

const wrapVariables = variables => variables.map(i => `'${i}': string | number`)

const hasVariables = variables => variables.length > 0

const buildTypePatternArguments = (ast) => {
  const messages = ast.body
  const options = messages
    .map(message => {
      const variablesName = messageVariablesName(message)

      if (hasVariables(variablesName)) {
        return dedent`
          T extends '${message.id.name}'
            ? [{ ${wrapVariables(variablesName).join(',')} }]
        `
      }

      return dedent`
        T extends '${message.id.name}'
          ? []
      `
    }).join(':\n')

  return dedent`
    type PatternArguments<T extends MessagesKey> = (
      ${options}
      : never
    )
  `
}

export default buildTypePatternArguments
