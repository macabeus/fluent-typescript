import dedent from 'dedent-js'

const buildTypeMessagesKey = (chunks: MessageVariablesChunks) =>
  chunks
    .map((subarray, index) => {
      const elements = subarray
        .map(([key]) => `'${key}'`)
        .join(' |\n')

      return dedent`
        type MessagesKey${index} = ${elements}
      `
    })
    .join('\n\n')

export default buildTypeMessagesKey
