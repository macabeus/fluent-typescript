#!/usr/bin/env node

const chokidar = require('chokidar')
const fs = require('fs')
const glob = require('glob')
const { start, buildFluentTypeModule } = require('../dist')

const startWatcher = (fileSystemApi, typeDefinitionFilepath) => {
  const typeDefinitionFilename = `${typeDefinitionFilepath}/translations.ftl.d.ts`

  glob('**/*.ftl', { ignore: ['node_modules/**/*', '.git/**/*'] }, (errors, matches) => {
    const files = matches.map(path => ({
      path,
      content: fileSystemApi.readFileSync(path, { encoding: 'utf-8' }),
    }))

    start(files)
  })

  const watcher = chokidar.watch('**/*.ftl', { ignored: ['node_modules/**/*', '.git/**/*'] })

  watcher
    .on('ready', () => console.log('🎬 Ready!'))
    .on('change', (path) => {
      console.log(`🔍 File was changed: ${path}`)

      const content = fileSystemApi.readFileSync(path, { encoding: 'utf-8' })
      const fluentTypeModule = buildFluentTypeModule({ path, content })

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
    })
}

if (require.main === module) {
  const typeDefinitionFilepath = process.argv[2]

  if (typeDefinitionFilepath === undefined) {
    console.error('❌ Error: missing argument with the path to save the type definition file!')
    console.error('Example: fluent-typescript ./assets/locales/')
    return
  }

  startWatcher(fs, typeDefinitionFilepath)
}
