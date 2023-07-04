import vue from "@vitejs/plugin-vue";

import { UserConfig, ConfigEnv, loadEnv, defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

import UnoCSS from "unocss/vite";

import path from "path";
const pathSrc = path.resolve(__dirname, "src");
import { createHtmlPlugin } from 'vite-plugin-html'

const testTarget = 'http://face.dev.laningtech.net'
import copy from 'rollup-plugin-copy' //引入插件

import { resolve } from 'path';
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    base: "/",
    //
    // resolve: {
    //   // 设置文件目录别名
    //   // 根目录地址变更，也需要调整
    //   alias: {
    //     '@': resolve(__dirname, './src'),
    //   },
    // },
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        //define global scss variable
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    server: {
      host: "0.0.0.0",
      // 反向代理解决跨域
      proxy: {
        '/taskapi/': {
          target: testTarget,
          changeOrigin: true,
          ws: true
        },
      },
      // 如下添加代码
      headers: {
        'Access-Control-Allow-Origin': '*', // 主应用获取子应用时跨域响应头
      },
    },
    define: {
      'process.env': {}
    },
    build: {
      // lib: {
      //   entry: [
      //     path.resolve(__dirname, 'src/packages/content/content.ts')],
      //     name: 'content',
      //     fileName: (format) => `js/content.js`
      // },      
      // rollup 配置打包项
      rollupOptions: {
        // 多页面入口配置
        input: {
          popup: path.resolve(__dirname, 'popup.html')
        }
        , output: {
          chunkFileNames: 'static/js/[name].js',
          entryFileNames: "static/js/[name].js",
          assetFileNames: "static/[ext]/name.[ext]"
        }
      }
    },
    plugins: [
      vue(),
      UnoCSS({
        /* options */
      }),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "@vueuse/core"],
        eslintrc: {
          enabled: false, //  Default `false`
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver({
            importStyle: 'sass' // 指示element-plus使用预处理样式
          }),
          // 自动导入图标组件
          IconsResolver({}),
        ],
        vueTemplate: true, // 是否在 vue 模板中自动导入
        dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"), //  自动导入组件类型声明文件位置，默认根目录; false 关闭自动生成
      }),

      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"], //@iconify-json/ep 是 Element Plus 的图标库
          }),
          // 自动导入 Element Plus 组件
          ElementPlusResolver({
            importStyle: 'sass' // 指示element-plus使用预处理样式
          }),
        ],
        dts: path.resolve(pathSrc, "types", "components.d.ts"), //  自动导入组件类型声明文件位置，默认根目录; false 关闭自动生成
      }),

      Icons({
        // 自动安装图标库
        autoInstall: true,
      }),

      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(pathSrc, "assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
      createHtmlPlugin({
        inject: { // 注入到页面当中的数据
          data: {
            title: 'vite'
          }
        }
      })
    ]
  };
});
