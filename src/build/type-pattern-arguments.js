import dedent from 'dedent-js'

const wrapVariables = variables => variables.map(i => `'${i}': FluentArgument`)

const hasVariables = variables => variables.length > 0

const buildTypePatternArguments = (messagesVariables) => {
  const options = Object.entries(messagesVariables)
    .map(([message, variables]) => {
      if (hasVariables(variables)) {
        return dedent`
          T extends '${message}'
            ? [T, { ${wrapVariables(variables).join(',')} }]
        `
      }

      return dedent`
        T extends '${message}'
          ? [T]
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
