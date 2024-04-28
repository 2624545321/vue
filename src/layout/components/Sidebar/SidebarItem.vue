<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :collapse-transition="false"
          :class="{
            'submenu-title-noDropdown': !isNest,
            [onlyOneChild.meta.class &&
            'menu-title_' + onlyOneChild.meta.class]: true,
          }"
          class="menu-title"
        >
          <!-- <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" :item="item" /> -->
          <div
            v-if="onlyOneChild.meta.image"
            class="menu-image"
            :class="onlyOneChild.meta.image"
          >
            <img
              class="menu-image-default"
              :src="
                require(`@/assets/imgs/menu/${onlyOneChild.meta.image}.png`)
              "
            />
            <img
              class="menu-image-active"
              :src="
                require(`@/assets/imgs/menu/${
                  onlyOneChild.meta.image
                }-active.png`)
              "
            />
          </div>
          <div class="el-menu-item__title" slot="title">
            <span class="text menu-text">
              <span :title="onlyOneChild.meta.title">
                {{ onlyOneChild.meta.title }}
              </span>
            </span>
          </div>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <!-- <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
          :item="item"
        /> -->

        <i
          v-if="item.meta.image"
          :class="item.meta.image"
          class="menu-image"
          style="margin-right: 1px"
        >
          <img
            class="menu-image-default"
            :src="require(`@/assets/imgs/menu/${item.meta.image}.png`)"
          />
        </i>
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else if (item.meta && item.meta.noRevealInMenu) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath, query) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      
      let url = path.resolve(this.basePath, routePath)
      if (query && typeof query === 'object') {
        url += '?'
        Object.keys(query).forEach(k => {
          url += k + '=' + query[k]
        })
      }
      return url
    },
  },
}
</script>
<style lang="scss">
// 菜单展开样式
.el-menu {
  padding-top: 13px;
  .menu-wrapper {
    margin-top: 30px;
    &:first-of-type {
      margin-top: 0;
    }
  }
  // .el-menu-item {
  // }
  .menu-image {
    width: 20px;
    height: 20px;
    margin-right: 6px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    img {
      max-width: 100%;
    }
  }
  .menu-image-default {
    display: block;
  }
  .menu-image-active {
    display: none;
  }

  .el-menu-item__title {
    flex-grow: 1;
    white-space: wrap;
    line-height: 16px;
  }
  .el-menu-item.is-active {
    background-color: var(--main-color);
    .menu-image-default {
      display: none;
    }
    .menu-image-active {
      display: block;
    }
  }
  .menu-title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 126px;
    height: 36px;
    padding: 0 0 0 10px !important;
    margin-left: 10px;
    margin-right: 10px;
    line-height: 36px;
    border-radius: 4px;
    cursor: pointer;
    .menu-text {
      font-size: 16px;
    }
    &.menu-title_chuanbodanwei {
      width: 142px;
    }
  }
}
// 菜单收起样式
.el-menu.el-menu--collapse {
  .menu-title {
    width: auto;
    position: relative;
    left: -5px;
    top: 7px;
    margin-left: 18px;
    margin-right: 0;
    background-color: transparent;
    .menu-image {
      position: relative;
      left: 5px;
      top: -2px;
      z-index: 1;
    }
  }
  .menu-title.is-active {
    &::after {
      content: '';
      position: absolute;
      top: 3px;
      width: 26px;
      height: 26px;
      background-color: #ce3e31;
      border-radius: 3px;
    }
  }
}
</style>
