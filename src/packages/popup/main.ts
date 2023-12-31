import { createApp } from 'vue';
import App from './App.vue';
import actions from '@/shared/actions'

import { setupStore } from '@/store';
import { setupDirective } from '@/directive';

// 本地SVG图标
import 'virtual:svg-icons-register';
// 样式
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'uno.css';
import '@/styles/index.scss'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

let app: any
function render(props: any) {
  props && actions.setActions(props)
  const container = props?.container
  app = createApp(App);

  app.use(ElementPlus, { locale: zhCn })
  // 全局注册 自定义指令(directive)
  setupDirective(app);
  // 全局注册 状态管理(store)
  setupStore(app);
  const c = container
    ? container.querySelector("#app-popup")
    : "#app-popup"
  app.mount(c)
}
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}

renderWithQiankun({
  async mount(props) {
    render(props);
  },
  bootstrap() {
  },
  unmount(props: any) {
    app.unmount();
  },
  update(props: any) {
  },
});


