import { FluentBundle, FluentResource } from '@fluent/bundle'
import ftl from '../assets/locales/pt-br/translations.ftl'

const resource = new FluentResource(ftl as string)
const bundle = new FluentBundle('pt-br') as FluentBundleTyped
bundle.addResource(resource)

const helloMessage = bundle.getMessage('hello')
const helloText = bundle.formatPattern(helloMessage.value, { firstName: 'Macabeus', lastName: 'Aquino' })
console.log('Hello:', helloText)

const howAreYouMessage = bundle.getMessage('how-are-you')
const howAreYouText = bundle.formatPattern(howAreYouMessage.value)
console.log('How Are You:', howAreYouText)

const byeMessage = bundle.getMessage('bye')
const byeText = bundle.formatPattern(byeMessage.value)
console.log('Bye:', byeText)
