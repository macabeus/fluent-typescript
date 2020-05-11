type Tag<K, T> = K & { __tag: T }

type TargetsSupported = 'vanilla' | 'react-18next'

type MessageIdentifier = Tag<string, 'MessageIdentifier'>
type MessageVariable = Tag<string, 'MessageVariable'>
type MessageVariablesMap = {
  [messageIdentifier in string]: MessageVariable[]
}

type CliFluentFile = {
  path: string
  content: string
}
