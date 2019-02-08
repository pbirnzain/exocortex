module.exports = {
  outputDir: './static/',
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
  devServer: {
    proxy: {
      '/login': {
        target: 'http://localhost:8000'
      },
      '/logout': {
        target: 'http://localhost:8000'
      },
      '/api': {
        target: 'http://localhost:8000'
      },
      '/admin': {
        target: 'http://localhost:8000'
      }
    }
  }
}
