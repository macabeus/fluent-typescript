import dedent from 'dedent-js'

const buildTypeMessagesKey = (messagesVariables: BatchList) => {

  return messagesVariables.map((subarray, index) => {

    const elements = subarray.map(([key]) => {
      return `'${key}'`
    }).join(' |\n')

    return dedent`
    type MessagesKey${index} = ${elements}
    `
  }).join('\n\n')
}

export default buildTypeMessagesKey
