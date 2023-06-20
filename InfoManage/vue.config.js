const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  //添加反向代理服务器
  devServer: {
    proxy: {
      "/adminapi": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
})
