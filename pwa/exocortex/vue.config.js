module.exports = {
  baseUrl: '/static/app/',
  outputDir: '../static/app/',
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000'
      },
      '/admin': {
        target: 'http://localhost:8000'
      }
    }
  }
}
