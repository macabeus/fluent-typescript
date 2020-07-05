// This file is automatically generated.
// Please do not change this file!

type Message<T extends MessagesKey> = {
  id: T
  value: T
  attributes: Record<string, T>
}

import { FluentBundle, FluentVariable } from '@fluent/bundle'

declare global {
  interface FluentBundleTyped extends FluentBundle {
    getMessage<T extends MessagesKey>(id: T): Message<T>
    formatPattern: <T extends MessagesKey>(...args: PatternArguments<T>) => string
  }
}

type MessagesKey = 'hello' |
'how-are-you' |
'bye'
type PatternArguments<T extends MessagesKey> = (
  T extends 'hello'
  ? [T, { 'firstName': FluentVariable,'lastName': FluentVariable }]:
T extends 'how-are-you'
  ? [T]:
T extends 'bye'
  ? [T]
  : never
)