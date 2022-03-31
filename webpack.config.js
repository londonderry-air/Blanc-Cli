module.exports = {
    entry: './bin/index.ts',
    target: 'node',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: ['ts-loader'],
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    externals: {
      fsevents: "require('fsevents')"
    }
};