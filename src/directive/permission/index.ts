import actions from '@/shared/actions';
import { Directive, DirectiveBinding } from 'vue';

/**
 * 按钮权限
 */
export const hasPerm: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 」按钮权限校验
    const { value } = binding;
    if (value) {
      const requiredPerms = value; // DOM绑定需要的按钮权限标识
      const all_permission = '*:*:*'
      const userInfo = actions.getUserInfo?.()||{}
      const permissions = userInfo?.resources||['*:*:*']
      const hasPerm = permissions?.some((perm:string)=> {
        return all_permission === perm ||requiredPerms.includes(perm);
      });

      if (!hasPerm) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(
        "need perms! Like v-has-perm=\"['sys:user:add','sys:user:edit']\""
      );
    }
  }
};
