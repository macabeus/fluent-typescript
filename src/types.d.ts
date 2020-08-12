type Tag<K, T> = K & { __tag: T }

type TargetsSupported = 'vanilla' | 'react-18next' | 'fluent-react'

type MessageIdentifier = Tag<string, 'MessageIdentifier'>
type MessageVariable = Tag<string, 'MessageVariable'>
type MessageVariablesMap = {
  [messageIdentifier in string]: MessageVariable[]
}

type CliFluentFile = {
  path: string
  content: string
}

type BatchList = [string, Tag<string,"MessageVariable">[]][][]
