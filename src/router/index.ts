import { createRouter,createWebHistory,  RouteRecordRaw } from "vue-router";
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'


// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/home",
    component: () => import("@/views/home.vue"),
  }
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__?'/':'/'),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
