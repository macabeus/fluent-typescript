import dedent from 'dedent-js'

const buildTypeMessagesKey = (messagesVariables: MessageVariablesMap) => {
  const messages = Object.keys(messagesVariables)

  const batchSize = 25;

  let returnValue: string = '';
  for (let index = 0; index < messages.length; index++) {

    if (index % batchSize === 0) {
      returnValue = dedent`
      ${returnValue}
      type MessagesKey${index / batchSize} = 
      `
    }

    if (index % batchSize > 0) {
      returnValue += ' |\n';
    }

    const element = messages[index];
    returnValue += `'${element}'`;
  }
  return returnValue;
}

export default buildTypeMessagesKey
