<template>
  <div>
    <el-card>
      <el-form inline>
        <el-form-item>
          <el-select v-model="value" value-key="id" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.label"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value" value-key="id" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.label"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value" value-key="id" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.label"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>content</el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

type Option = {
  id: number
  label: string
  desc: string
}
const value = ref<Option>()
const options = ref([
  { id: 1, label: 'Option A', desc: 'Option A - 230506' },
  { id: 2, label: 'Option B', desc: 'Option B - 230506' },
  { id: 3, label: 'Option C', desc: 'Option C - 230506' },
  { id: 4, label: 'Option A', desc: 'Option A - 230507' },
])
</script>

<style lang="scss" scoped></style>
