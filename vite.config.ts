// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// element plus
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
// svg plugin
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// mock
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), './src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        // 表示在命令行，也就是本地启动时启用
        localEnabled: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
  }
})
