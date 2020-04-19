const { FluentResource } = require('@fluent/bundle')
const dedent = require('dedent-js')
const fs = require('fs')
const path = require('path')
const loaderUtils = require('loader-utils')
const buildHeader = require('./build-header')
const buildTypeMessagesKey = require('./build-type-messages-key')
const buildTypePatternArguments = require('./build-type-pattern-arguments')

const getTypeDefinitionFilename = filename => {
  const dirName = path.dirname(filename)
  const baseName = path.basename(filename)
  return path.join(dirName, `${baseName}.d.ts`)
}

const makeDoneHandlers = (callback, content, rest) => ({
  failed: e => callback(e),
  success: () => callback(null, content, ...rest),
})

module.exports = function(content, ...rest) {
  const query = loaderUtils.getOptions(this) || {}
  const fileSystemApi = query.fs || fs

  const { failed, success } = makeDoneHandlers(this.async(), content, rest)

  const typeDefinitionFilename = getTypeDefinitionFilename(this.resourcePath)

  const resource = (new FluentResource(content)).body

  const fluentModuleDefinition = dedent`
    ${buildHeader()}
    ${buildTypeMessagesKey(resource)}
    ${buildTypePatternArguments(resource)}
  `

  fileSystemApi.writeFile(
    typeDefinitionFilename,
    fluentModuleDefinition,
    { encoding: 'utf-8' },
    (err) => {
      if (err) {
        failed(err)
        return
      }
      
      success()
    }
  )
}
