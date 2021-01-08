const glob = require('glob')
const { normalize } = require('path')
const { start } = require('../dist')
const { emitFluentTypeModule } = require('./emit-fluent-type-module')

const runFluentTypescript = (fileSystemApi, typeDefinitionTarget, typeDefinitionFilepath) => {
  glob('**/*.ftl', { ignore: ['node_modules/**/*', '.git/**/*'] }, (errors, matches) => {
    const files = matches.map(path => ({
      path: normalize(path),
      content: fileSystemApi.readFileSync(path, { encoding: 'utf-8' }),
    }))

    start(files)
    emitFluentTypeModule(fileSystemApi, typeDefinitionTarget, typeDefinitionFilepath)
  })
}

module.exports = { runFluentTypescript }
