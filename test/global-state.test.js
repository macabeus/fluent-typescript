import dedent from 'dedent-js'
import { updateGlobalState, getMessagesVariables } from '../src/global-state'

describe('global-state', () => {
  afterEach(() => updateGlobalState('reset'))

  test('Should can initialize', () => {
    const fixturePt = dedent`
      hello = Olá { $firstName }
      how-are-you = Como você está?
      bye = Tchau
    `
    const fixtureJp = dedent`
      hello = こんにちは{ $lastName }
      how-are-you = お元気ですか？
    `

    updateGlobalState('addContent', { path: 'pt.ftl', content: fixturePt })
    const messagesVariablesPt = getMessagesVariables()
    expect(messagesVariablesPt).toEqual({
      hello: ['firstName'],
      'how-are-you': [],
      bye: [],
    })

    updateGlobalState('addContent', { path: 'jp.ftl', content: fixtureJp })
    const messagesVariablesPtJp = getMessagesVariables()
    expect(messagesVariablesPtJp).toEqual({
      hello: ['firstName', 'lastName'],
      'how-are-you': [],
      bye: [],
    })
  })

  test('Should update message variables', () => {
    const fixturePt = dedent`
      hello = Olá { $name }
    `
    const fixturePtSecondVersion = dedent`
      hello = Olá { $firstName }
    `

    updateGlobalState('addContent', { path: 'pt.ftl', content: fixturePt })
    const messagesVariablesPt = getMessagesVariables()
    expect(messagesVariablesPt).toEqual({
      hello: ['name'],
    })

    updateGlobalState('updateContent', { path: 'pt.ftl', content: fixturePtSecondVersion })
    const messagesVariablesPtSecondVersion = getMessagesVariables()
    expect(messagesVariablesPtSecondVersion).toEqual({
      hello: ['firstName'],
    })
  })

  test('Should remove message not used anymore', () => {
    const fixturePt = dedent`
      hello = Olá { $name }
      how-are-you = Como você está?
    `
    const fixturePtSecondVersion = dedent`
      hello = Olá { $name }
    `

    updateGlobalState('addContent', { path: 'pt.ftl', content: fixturePt })
    const messagesVariablesPt = getMessagesVariables()
    expect(messagesVariablesPt).toEqual({
      hello: ['name'],
      'how-are-you': [],
    })

    updateGlobalState('updateContent', { path: 'pt.ftl', content: fixturePtSecondVersion })
    const messagesVariablesPtSecondVersion = getMessagesVariables()
    expect(messagesVariablesPtSecondVersion).toEqual({
      hello: ['name'],
    })
  })

  test('Should keep message if is still used on some language', () => {
    const fixturePt = dedent`
      hello = Olá { $firstName }
      how-are-you = Como você está?
    `
    const fixturePtSecondVersion = dedent`
      hello = Olá { $firstName }
    `
    const fixtureJp = dedent`
      hello = こんにちは{ $lastName }
      how-are-you = お元気ですか？
    `

    updateGlobalState('addContent', { path: 'pt.ftl', content: fixturePt })
    updateGlobalState('addContent', { path: 'jp.ftl', content: fixtureJp })
    const messagesVariablesPtJp = getMessagesVariables()
    expect(messagesVariablesPtJp).toEqual({
      hello: ['firstName', 'lastName'],
      'how-are-you': [],
    })

    updateGlobalState('updateContent', { path: 'pt.ftl', content: fixturePtSecondVersion })
    const messagesVariablesPtSecondVersionJp = getMessagesVariables()
    expect(messagesVariablesPtSecondVersionJp).toEqual({
      hello: ['firstName', 'lastName'],
      'how-are-you': [],
    })
  })
})
