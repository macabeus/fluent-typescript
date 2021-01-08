const { buildFluentTypeModule } = require('../dist')

const emitFluentTypeModule = (fileSystemApi, typeDefinitionTarget, typeDefinitionFilepath) => {
  const fluentTypeModule = buildFluentTypeModule(typeDefinitionTarget)
  const typeDefinitionFilename = `${typeDefinitionFilepath}/translations.ftl.d.ts`
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

module.exports = { emitFluentTypeModule }
