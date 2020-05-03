const buildTypeMessagesKey = (messagesVariables) => {
  const messages = Object.keys(messagesVariables)
  const interfaceFields = messages
    .map(message => `'${message}'`)
    .join(' |\n')

  return `type MessagesKey = ${interfaceFields}`
}

export default buildTypeMessagesKey
