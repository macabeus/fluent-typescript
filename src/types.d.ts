type Tag<K, T> = K & { __tag: T }

type MessageIdentifier = Tag<string, 'MessageIdentifier'>
type MessageVariable = Tag<string, 'MessageVariable'>
type MessageVariablesMap = {
  [messageIdentifier in string]: MessageVariable[]
}

type CliFluentFile = {
  path: string
  content: string
}
