const buildTypeMessagesKey = (ast) => {
  const messages = ast.body
    .filter(node => node.type === 'Message')

  const interfaceFields = messages
    .map(message => `'${message.id.name}'`)
    .join(' |\n')

  return `type MessagesKey = ${interfaceFields}`
}

export default buildTypeMessagesKey
