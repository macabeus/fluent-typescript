#!/usr/bin/env node

const chokidar = require('chokidar')
const fs = require('fs')
const glob = require('glob')
const { normalize } = require('path')
const { start, updateContent, buildFluentTypeModule, targetsSupported } = require('../dist')

const startWatcher = (fileSystemApi, typeDefinitionTarget, typeDefinitionFilepath) => {
  const typeDefinitionFilename = `${typeDefinitionFilepath}/translations.ftl.d.ts`

  const emitFluentTypeModule = () => {
    const fluentTypeModule = buildFluentTypeModule(typeDefinitionTarget)

    fileSystemApi.writeFile(
      typeDefinitionFilename,
      fluentTypeModule,
      { encoding: 'utf-8' },
      (err) => {
        if (err) {
          console.log('❌ Error')
          console.log(err)
          return
        }

        console.log(`🏁 Type definition updated: ${typeDefinitionFilename}`)
      }
    )
  }

  glob('**/*.ftl', { ignore: ['node_modules/**/*', '.git/**/*'] }, (errors, matches) => {
    const files = matches.map(path => ({
      path: normalize(path),
      content: fileSystemApi.readFileSync(path, { encoding: 'utf-8' }),
    }))

    start(files)
    emitFluentTypeModule()
  })

  const watcher = chokidar.watch('**/*.ftl', { ignored: ['node_modules/**/*', '.git/**/*'] })

  watcher
    .on('ready', () => console.log('🎬 Ready!'))
    .on('unlink', (path) => {
      console.log(`🔍 File was deleted: ${path}`)

      const content = ''
      updateContent({ path, content })

      emitFluentTypeModule()
    })
    .on('change', (path) => {
      console.log(`🔍 File was changed: ${path}`)

      const content = fileSystemApi.readFileSync(path, { encoding: 'utf-8' })
      updateContent({ path, content })

      emitFluentTypeModule()
    })
}

if (require.main === module) {
  const typeDefinitionTarget = process.argv[2]
  const typeDefinitionFilepath = process.argv[3]

  if (typeDefinitionTarget === undefined) {
    console.error('❌ Error: missing argument with the target!')
    console.error('Example: fluent-typescript vanilla ./assets/locales/')
    return
  }

  if (targetsSupported.includes(typeDefinitionTarget) === false) {
    console.error('❌ Error: target not supported!')
    console.error(`At this moment, we support only: ${targetsSupported.join(', ')}`)
    return
  }

  if (typeDefinitionFilepath === undefined) {
    console.error('❌ Error: missing argument with the path to save the type definition file!')
    console.error('Example: fluent-typescript vanilla ./assets/locales/')
    return
  }

  startWatcher(fs, typeDefinitionTarget, typeDefinitionFilepath)
}
