<template>
  <el-image
    v-if="isSingle"
    style="width: 100%; height: 100%"
    :fit="fit"
    :src="internalSrc[0]"
    :alt="alt"
    :preview-src-list="internalSrc"
    v-on="$listeners"
  ></el-image>
  <el-carousel
    v-else
    trigger="click"
    style="width: 100%; height: 100%"
    height="100%"
    :autoplay="false"
  >
    <el-carousel-item v-for="(its, i) in internalSrc" :key="i">
      <el-image
        style="width: 100%; height: 100%"
        :fit="fit"
        :src="its"
        :alt="alt"
        :preview-src-list="internalSrc"
        v-on="$listeners"
      ></el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'ImagePreview',
  props: {
    src: {
      type: [String, Array],
      default: '',
    },
    fit: {
      type: String,
      default: 'scale-down',
    },
    alt: {
      type: String,
      default: '图片',
    },
  },
  data() {
    return {
      internalSrc: [],
    }
  },
  computed: {
    isSingle() {
      return this.internalSrc.length < 2
    },
  },
  watch: {
    src: {
      handler(v) {
        if (!v) return
        this.setInternalSrc(v)
      },
      immediate: true,
    },
  },
  methods: {
    setInternalSrc(v) {
      if (Array.isArray(v)) {
        this.internalSrc = v
        return
      }
      this.internalSrc = v.split(',')
    },
  },
}
</script>

<style></style>
