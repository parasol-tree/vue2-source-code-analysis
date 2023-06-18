import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import eslint from '@rollup/plugin-eslint'
import alias from '@rollup/plugin-alias'
import path from 'path'

const projectRootDir = path.resolve(__dirname)

export default {
  input: './src/index.js', // 打包的入口文件
  // 打包的出口文件
  output: {
    file: 'dist/vue.js',
    format: 'umd',
    name: 'Vue',
    sourcemap: true,
  },
  plugins: [
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      // include: ["src//*.js"],
      include: ['src/**/*.js'], // 需要检查的部分
      exclude: ['node_modules/**'] // 排除的部分
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    serve({
      port: 3000,
      openPage: './index.html',
      contentBase: ''
    }),
    alias({
      entries: [
        { find: '@', replacement: path.resolve(projectRootDir, './src') },
      ]
    })
  ]
}
