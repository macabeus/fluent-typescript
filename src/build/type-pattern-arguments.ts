import dedent from 'dedent-js'

type Variables = MessageVariable[]

const wrapVariables = (variables: Variables) => variables.map(i => `'${i}': FluentVariable`)

const hasVariables = (variables: Variables) => variables.length > 0

const buildTypePatternArguments = (messagesVariables: BatchList) => {

  return messagesVariables.map((subarray, index) => {
    const elements = subarray.map(entry => {
      const [message, variables] = entry
      if (hasVariables(variables)) {
        return dedent`
          T extends '${message}'
            ? [T, { ${wrapVariables(variables).join(',')} }]
        `
      } else {
        return dedent`
        T extends '${message}'
          ? [T]
      `
      }
    }).join(':\n')

    return dedent`
    type PatternArguments${index}<T extends MessagesKey${index}> = (
      ${elements}
      : never
    )`
  }).join('\n\n')
}

export default buildTypePatternArguments
