const buildTypeMessagesKey = (resource) => {
  const interfaceFields = resource
    .map(message => `'${message.id}'`)
    .join(' |\n')

  return `type MessagesKey = ${interfaceFields}`
}

module.exports = buildTypeMessagesKey
