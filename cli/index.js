#!/usr/bin/env node

const chokidar = require('chokidar')
const fs = require('fs')
const path = require('path')
const buildFluentTypeModule = require('../dist')

const getTypeDefinitionFilename = filename => {
  const dirName = path.dirname(filename)
  const baseName = path.basename(filename)
  return path.join(dirName, `${baseName}.d.ts`)
}

const startWatcher = (fileSystemApi) => {
  const watcher = chokidar.watch('**/*.ftl', { ignored: ['node_modules/**/*', '.git/**/*'] })

  watcher
    .on('ready', () => console.log('🎬 Ready!'))
    .on('change', (path) => {
      console.log(`🔍 File was changed: ${path}`)

      const typeDefinitionFilename = getTypeDefinitionFilename(path)
      const content = fileSystemApi.readFileSync(path, { encoding: 'utf-8' })
      const fluentTypeModule = buildFluentTypeModule(content)

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
  startWatcher(fs)
}
