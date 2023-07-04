<template>
  <el-dialog :title="title" v-model="dialog.visible" width="500px" @close="closeDialog">
    <el-form ref="ruleFormRef" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="后台地址：" prop="bg_url">
        <el-select
          v-model="formData.bg_url"
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="Choose tags for your article"
          style="width: 300px;"
        >
          <el-option
            v-for="item in urlOpts"
            :key="item.value"
            :label="item.value"
            :value="item.value"
            style="width: 450px;"
          >
            <span style="float: left">{{ item.value}}</span>
            <span
              style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
            >{{ item.label }}</span>
          </el-option>

        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" :loading="sureloading" @click="handleSubmit">保 存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { saveBgUrl } from "@/msg-api/reginst"
import { cloneDeep } from 'lodash-unified'
import type { FormInstance, FormRules } from 'element-plus'

const emits = defineEmits(['handleUpdate'])

const dialog = reactive({
  visible: false
})
const defaultFormData={
  bg_url:"",
}
let formData = ref({
  bg_url:"",
});
const initRules = {
  bg_url: [{ required: true, message: '请输入后台链接', trigger: 'blur' }],
}
const rules = reactive<FormRules>(initRules || {})
const ruleFormRef = ref<FormInstance>()
const title = computed(() => {
  return `填写后台链接`
})
const urlOpts=ref([{
  value:'http://face.dev.laningtech.net/',
  label:'智能识别测试环境'
}])

async function showPage(selectRow) {
  formData.value = cloneDeep({...defaultFormData,...(selectRow||{})})
  dialog.visible = true
  await nextTick()
  ruleFormRef.value?.clearValidate()
}
//Submit
async function handleSubmit() {
  if (!ruleFormRef.value?.validate) { return }
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      handleAdvAdd()
      console.log('error submit!', fields)
    }
  })
}
const sureloading = ref<boolean>(false)
function handleAdvAdd() {
    sureloading.value = true
    saveBgUrl({ ...formData.value }).then((res) => {
      sureloading.value = false
      emits('handleUpdate')
      ruleFormRef.value?.resetFields()
      ElMessage({
        showClose: true,
        message: '保存成功',
        type: 'success',
      })
      dialog.visible = false;
    })
      .catch((err) => {
        console.log('err',err)
        sureloading.value = false
        console.log(err)
        ElMessage({
          showClose: true,
          message: '保存失败',
          type: 'error',
        })
      })
}

function closeDialog() {
  dialog.visible = false
}

defineExpose({
  showPage
})
</script>

