import dedent from 'dedent-js'

type Variables = MessageVariable[]

const wrapVariables = (variables: Variables) => variables.map(i => `'${i}': FluentVariable`)

const hasVariables = (variables: Variables) => variables.length > 0

const buildTypePatternArguments = (messagesVariables: MessageVariablesMap) => {
  const options = Object.entries(messagesVariables);

  const batchSize = 25;
  let returnValue: string = '';
  for (let index = 0; index < options.length; index++) {
    const [message, variables] = options[index];



    if (index % batchSize === 0) {
      if (index > 0) {
        returnValue += dedent`
        : never
        )
        
        `
      }
      returnValue += dedent`
      type PatternArguments${index / batchSize}<T extends MessagesKey${index / batchSize}> = ( 
      `
    }

    if (index % batchSize > 0) {
      returnValue += ':\n';
    }

    if (hasVariables(variables)) {
      returnValue += dedent`
        T extends '${message}'
          ? [T, { ${wrapVariables(variables).join(',')} }]
      `
    } else {
      returnValue += dedent`
      T extends '${message}'
        ? [T]
    `
    }


  }
  returnValue += dedent`
        : never
        )
        
        `
  return returnValue;




}

export default buildTypePatternArguments
