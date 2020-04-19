import path from 'path'
import webpack from 'webpack'
import { Volume } from 'memfs'

const webpackRules = fixture => {
  const fs = new Volume()
  fs.mkdirSync(__dirname, { recursive: true })

  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.ftl$/,
        use: {
          loader: path.resolve(__dirname, '../src/loader.js'),
          options: {
            fs,
          },
        },
      }],
    },
  })

  return new Promise((resolve, reject) =>
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
        return
      }

      if (fs.existsSync(`${__dirname}/${fixture}.d.ts`) === false) {
        if (stats.hasErrors()) {
          return reject(new Error(stats.toJson().errors))
        }

        return reject(new Error('Type file was not generated'))
      }
      
      resolve(fs.readFileSync(`${__dirname}/${fixture}.d.ts`, 'utf8'))
    })
  )
}

export default webpackRules
