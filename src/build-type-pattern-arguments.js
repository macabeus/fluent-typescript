import dedent from 'dedent-js'

const messageVariables = (message) => {
  if (typeof message.value === 'string') {
    return []
  }

  const variables = message.value.reduce(
    (acc, current) => current.type === 'var'
      ? [...acc, current.name]
      : acc
    , []
  )

  return variables
}

const wrapVariables = variables => variables.map(i => `'${i}': string | number`)

const hasVariables = variables => variables.length > 0

const buildTypePatternArguments = (resource) => {
  const options = resource
    .map(message => {
      const variables = messageVariables(message)

      if (hasVariables(variables)) {
        return dedent`
          T extends '${message.id}'
            ? { ${wrapVariables(messageVariables(message)).join(',')} }`
      }

      return dedent`
        T extends '${message.id}'
          ? undefined`
    }).join(':\n')

  return (
`type PatternArguments<T extends MessagesKey> = (
  ${options}
  : never
)`
  )
}

export default buildTypePatternArguments
