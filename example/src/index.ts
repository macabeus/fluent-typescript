import { FluentBundle, FluentResource } from '@fluent/bundle'
import ftl from '../assets/locales/pt-br/translations.ftl'

const resource = new FluentResource(ftl as string)
const bundle = new FluentBundle('pt-br') as FluentBundleTyped
bundle.addResource(resource)

const helloMessage = bundle.getMessage('hello')
const helloText = bundle.formatPattern(helloMessage.value, { name: 'Macabeus' })
console.log('Hello:', helloText)

const howAreYouMessage = bundle.getMessage('how-are-you')
const howAreYouText = bundle.formatPattern(howAreYouMessage.value)
console.log('How Are You:', howAreYouText)
