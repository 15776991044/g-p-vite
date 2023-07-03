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

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

let app: any
const appId='app-content'
const app2=document.createElement('div')
app2.id=appId
document.body.appendChild(app2);


function render(props:any) {
  props&&actions.setActions(props)
  const container=props?.container
  app = createApp(App);
  app.use(ElementPlus)
  // 全局注册 自定义指令(directive)
  setupDirective(app);
  // 全局注册 状态管理(store)
  setupStore(app);
  const c = container
  ? container.querySelector(`#${appId}`)
  : `#${appId}`
  app.mount(c)
}
  render({})




