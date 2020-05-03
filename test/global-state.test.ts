import dedent from 'dedent-js'
import { updateGlobalState, getMessagesVariables } from '../src/global-state'

describe('global-state', () => {
  afterEach(() => updateGlobalState({ type: 'reset' }))

  test('Should can initialize', () => {
    const fixturePt: CliFluentFile = {
      path: 'pt.ftl',
      content: dedent`
        hello = Olá { $firstName }
        how-are-you = Como você está?
        bye = Tchau
      `,
    }
    const fixtureJp: CliFluentFile = {
      path: 'jp.ftl',
      content: dedent`
        hello = こんにちは{ $lastName }
        how-are-you = お元気ですか？
      `,
    }

    updateGlobalState({ type: 'addContent', payload: fixturePt })
    const messagesVariablesPt = getMessagesVariables()
    expect(messagesVariablesPt).toEqual({
      hello: ['firstName'],
      'how-are-you': [],
      bye: [],
    })

    updateGlobalState({ type: 'addContent', payload: fixtureJp })
    const messagesVariablesPtJp = getMessagesVariables()
    expect(messagesVariablesPtJp).toEqual({
      hello: ['firstName', 'lastName'],
      'how-are-you': [],
      bye: [],
    })
  })

  test('Should update message variables', () => {
    const fixturePt: CliFluentFile = {
      path: 'pt.ftl',
      content: dedent`
        hello = Olá { $name }
      `,
    }
    const fixturePtSecondVersion: CliFluentFile = {
      path: 'pt.ftl',
      content: dedent`
        hello = Olá { $firstName }
      `,
    }

    updateGlobalState({ type: 'addContent', payload: fixturePt })
    const messagesVariablesPt = getMessagesVariables()
    expect(messagesVariablesPt).toEqual({
      hello: ['name'],
    })

    updateGlobalState({ type: 'updateContent', payload: fixturePtSecondVersion })
    const messagesVariablesPtSecondVersion = getMessagesVariables()
    expect(messagesVariablesPtSecondVersion).toEqual({
      hello: ['firstName'],
    })
  })

  test('Should remove message not used anymore', () => {
    const fixturePt: CliFluentFile = {
      path: 'pt.ftl',
      content: dedent`
        hello = Olá { $name }
        how-are-you = Como você está?
      `,
    }
    const fixturePtSecondVersion: CliFluentFile = {
      path: 'pt.ftl',
      content: dedent`
        hello = Olá { $name }
      `,
    }

    updateGlobalState({ type: 'addContent', payload: fixturePt })
    const messagesVariablesPt = getMessagesVariables()
    expect(messagesVariablesPt).toEqual({
      hello: ['name'],
      'how-are-you': [],
    })

    updateGlobalState({ type: 'updateContent', payload: fixturePtSecondVersion })
    const messagesVariablesPtSecondVersion = getMessagesVariables()
    expect(messagesVariablesPtSecondVersion).toEqual({
      hello: ['name'],
    })
  })

  test('Should keep message if is still used on some language', () => {
    const fixturePt: CliFluentFile = {
      path: 'pt.ftl',
      content: dedent`
        hello = Olá { $firstName }
        how-are-you = Como você está?
      `,
    }
    const fixturePtSecondVersion: CliFluentFile = {
      path: 'pt.ftl',
      content: dedent`
        hello = Olá { $firstName }
      `,
    }
    const fixtureJp: CliFluentFile = {
      path: 'jp.ftl',
      content: dedent`
        hello = こんにちは{ $lastName }
        how-are-you = お元気ですか？
      `,
    }

    updateGlobalState({ type: 'addContent', payload: fixturePt })
    updateGlobalState({ type: 'addContent', payload: fixtureJp })
    const messagesVariablesPtJp = getMessagesVariables()
    expect(messagesVariablesPtJp).toEqual({
      hello: ['firstName', 'lastName'],
      'how-are-you': [],
    })

    updateGlobalState({ type: 'updateContent', payload: fixturePtSecondVersion })
    const messagesVariablesPtSecondVersionJp = getMessagesVariables()
    expect(messagesVariablesPtSecondVersionJp).toEqual({
      hello: ['firstName', 'lastName'],
      'how-are-you': [],
    })
  })

  test('Should can read variables on a selector', () => {
    const fixtureEn: CliFluentFile = {
      path: 'en.ftl',
      content: dedent`
        emails =
          { $unreadEmails ->
              [one] { $name } has one unread email.
            *[other] { $name } has { $unreadEmails } unread emails.
          }
      `,
    }

    updateGlobalState({ type: 'addContent', payload: fixtureEn })
    const messagesVariablesPt = getMessagesVariables()
    expect(messagesVariablesPt).toEqual({
      emails: ['name', 'unreadEmails'],
    })
  })

  test('Should can read variables on a built-in function', () => {
    const fixtureEn: CliFluentFile = {
      path: 'en.ftl',
      content: dedent`
        time-elapsed = Time elapsed: { NUMBER($duration, maximumFractionDigits: 0) }s.
      `,
    }

    updateGlobalState({ type: 'addContent', payload: fixtureEn })
    const messagesVariablesPt = getMessagesVariables()
    expect(messagesVariablesPt).toEqual({
      'time-elapsed': ['duration'],
    })
  })
})
