<template>
  <button
    :class="loading && 'custom-btn-loading'"
    class="tas-custom-btn"
    :type="nativeType"
  >
    <template v-if="!loading">
      <template v-if="btnData && btnData.icon">
        <div
          class="icon"
          :style="{ 'background-image': `url(${btnData.icon})` }"
        ></div>
        <div
          class="icon-active"
          :style="{ 'background-image': `url(${btnData.activeIcon})` }"
        ></div>
      </template>
      <span>{{ btnData && btnData.label }}</span>
    </template>
    <template v-else>
      <i class="el-icon-loading"></i>
      &nbsp;{{ loadingText }}
    </template>
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    btnData: {
      default: () => {},
    },
    nativeType: {
      default: 'button',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingText: {
      type: String,
      default: '加载中',
    },
  },
}
</script>

<style lang="scss" scoped>
.tas-custom-btn {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  padding: 0.1rem 0.225rem;
  white-space: nowrap;
  background-color: #fff;
  border: 1px solid #e5e6ea;
  border-radius: 0.05rem;
  cursor: pointer;

  .icon,
  .icon-active {
    width: 0.25rem;
    height: 0.25rem;
    margin-right: 0.05rem;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  .icon {
    display: block;
  }
  .icon-active {
    display: none;
  }
}

.tas-custom-btn.active,
.tas-custom-btn:hover {
  // color: var(--main-color);
  color: #fff;
  border-color: rgba(235, 88, 71, 1);
  background-color: var(--main-color);
  .icon {
    display: none;
  }
  .icon-active {
    display: block;
  }
}
// .tas-custom-btn:focus,
.tas-custom-btn:active {
  opacity: 0.8;
  color: #fff;
  border-color: rgba(235, 88, 71, 1);
  background-color: var(--main-color);
}

.tas-custom-btn.active {
  color: #fff;
  border-color: currentColor;
  background-color: var(--main-color);
  .icon {
    display: none;
  }
  .icon-active {
    display: block;
  }
}

.custom-btn-loading {
  pointer-events: none;
  // cursor: not-allowed;
  opacity: 0.7;
}
</style>
