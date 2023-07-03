import { defineStore } from 'pinia';
import { store } from '@/store';
export const useUserStore = defineStore('user', () => {
  // state
  const perms = ref<Array<string>>([]); // 用户权限编码集合 → 判断按钮权限
  function setPerms(perms:any) {
      perms.value = perms;
  }
  return {
    perms,
    setPerms,
  };
});

// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
