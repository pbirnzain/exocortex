module.exports = {
  baseUrl: '/static/app/',
  outputDir: 'build',
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
      }
    }
  }
}
