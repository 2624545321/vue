<template>
    <!-- 底部的切换按钮 -->
    <div class="btn-group-toggle">
        <span
            @click="handleMenuCollapse(false)"
            :class="!isCollapse && 'activated'"
            class="icon-normal"
        ></span>
        <span
            v-show="!isCollapse"
            @click="handleMenuCollapse(true)"
            :class="isCollapse && 'activated'"
            class="icon-collapse"
        ></span>
    </div>
</template>

<script>
export default {
    name: 'MenuBtnGroupToggle',
    model: {
        prop: 'isCollapse',
        event: 'toggle'
    },
    props: {
        isCollapse: {
            required: true,
            type: Boolean
        }
    },
    methods: {
        /**
         * @desc 菜单收起还是还是展开
         * @param { boolean } isCollapse
         * 
         * @return void
         */
        handleMenuCollapse(isCollapse) {
            this.$emit('toggle', isCollapse)
        }
    }
};
</script>

<style lang="scss" scoped>
.btn-group-toggle {
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    .icon-normal,
    .icon-collapse {
        width: 36px;
        height: 36px;
        border: 2px solid transparent;
        cursor: pointer;
        &:hover,
        &.activated {
            border: 2px solid #e7e7e7;
            background-color: #fff;
        }
    }
    .icon-normal {
        background: url('~@/assets/imgs/menu/status-fold.png') no-repeat center;
    }
    .icon-collapse {
        margin-left: 10px;
        background: url('~@/assets/imgs/menu/status-unfold.png') no-repeat center;
    }
}
</style>
