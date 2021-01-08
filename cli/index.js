#!/usr/bin/env node

const chokidar = require('chokidar')
const fs = require('fs')
const { updateContent, targetsSupported } = require('../dist')
const { emitFluentTypeModule } = require('./emit-fluent-type-module')
const { runFluentTypescript } = require('./run-fluent-typescript')

const startWatcher = (fileSystemApi, typeDefinitionTarget, typeDefinitionFilepath) => {
  runFluentTypescript(fileSystemApi, typeDefinitionTarget, typeDefinitionFilepath)

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

      emitFluentTypeModule(fileSystemApi, typeDefinitionTarget, typeDefinitionFilepath)
    })
}

if (require.main === module) {
  const typeDefinitionTarget = process.argv[2]
  const typeDefinitionFilepath = process.argv[3]
  const noWatchFlag = process.argv[4]

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

  if (noWatchFlag === '--no-watch') {
    runFluentTypescript(fs, typeDefinitionTarget, typeDefinitionFilepath)
    return
  }

  startWatcher(fs, typeDefinitionTarget, typeDefinitionFilepath)
}
