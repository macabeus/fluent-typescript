import { Visitor, Message, VariableReference, Resource } from '@fluent/syntax'

class VisitorListVariables extends Visitor {
  result: Set<MessageVariable>

  constructor() {
    super()
    this.result = new Set()
  }

  visitVariableReference(nodePlaceable: VariableReference) {
    this.result.add(nodePlaceable.id.name as MessageVariable)
  }
}

class VisitorListMessages extends Visitor {
  result: { [messageIdentifier in string]: MessageVariable[] }

  constructor() {
    super()
    this.result = {}
  }

  visitMessage(node: Message) {
    const visitorListVariables = new VisitorListVariables()
    visitorListVariables.visit(node)
    this.result[node.id.name] = [...visitorListVariables.result].sort()
  }
}

const listMessagesVariables = (ast: Resource) => {
  const visitorMessage = new VisitorListMessages()
  visitorMessage.visit(ast)

  return visitorMessage.result
}

export default listMessagesVariables
