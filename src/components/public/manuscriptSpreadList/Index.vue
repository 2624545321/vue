<template>
  <ul>
    <li v-for="(cb, i) of list" :key="i" class="chuanboli-list-item pb-5">
      <!-- :class="'medal-' + (i + 1)" -->
      <i :class="'ml-serial-0' + (i + 1)" class="ml-serial text-center fs-16">
        {{ i + 1 }}
      </i>
      <div class="cl-title flex-grow-1">
        <custom-manuscript-title-vue
          :title="cb.title | strRemoveHtmlEntity | strRemoveHtmlTag"
          :query-param="{
            zbGuid: cb.zbGuid || cb.zbgUid,
            mc: cb.mediaName,
            channel,
          }"
          class="reset-manuscript-title"
        ></custom-manuscript-title-vue>

        <p class="cl-info fs-14">
          <span class="cl-info-1">{{ cb.mediaName }}</span>
          <span>{{ cb.docChannel || '' }}</span>
          <span>{{ cb.author || '' }}</span>
        </p>

        <div class="cl-usage-count_wrapper">
          <div v-if="iconList.length" class="cl-usage-count">
            <div v-for="(md, i) of iconList" :key="i" class="usage-count-item">
              <el-tooltip effect="dark" placement="top" :content="md.t">
                <div>
                  <i :class="'uc-icon__' + md.i" class="uc-icon"></i>
                  <span v-if="channel === 'weixin'" class="fs-14">
                    {{ (cb[md.field] || 0) | numberAddSuffix }}
                  </span>
                  <span v-else class="fs-14">
                    {{ cb[md.field] || 0 }}
                  </span>
                </div>
              </el-tooltip>
            </div>
          </div>

          <div>
            <span>{{ (cb.pubTime || '').replace(/\//g, '-').slice(0, 10) }}</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'manuscriptSpreadList',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    iconList: {
      type: Array,
      default: () => [],
    },
    channel: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.chuanboli-list-item {
  display: flex;
  padding: 0.125rem 0.125rem 0.125rem 0;
  i {
    font-style: normal;
  }
  .ml-serial {
    flex-shrink: 0;
    margin-top: 4px;
  }
  .serial {
    width: 0.25rem;
    height: 0.25rem;
    margin-top: 0.05rem;
    line-height: 0.25rem;
    color: #959595;
    border-radius: 50%;
    background-color: #eee;
  }
  .medal {
    width: 0.3rem;
    height: 0.3875rem;
    flex-shrink: 0;
    line-height: 0.325rem;
    text-align: center;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .medal-1 {
    color: #fff;
    background-image: url('~@/assets/imgs/spreadOverview/ManuscriptSpreadRanking/medal-1.png');
  }
  .medal-2 {
    color: #8d97a1;
    background-image: url('~@/assets/imgs/spreadOverview/ManuscriptSpreadRanking/medal-2.png');
  }
  .medal-3 {
    color: #fff;
    background-image: url('~@/assets/imgs/spreadOverview/ManuscriptSpreadRanking/medal-3.png');
  }
  .cl-title {
    flex-grow: 1;
    margin-left: 0.175rem;
    overflow: hidden;
    // & > span {
    //   line-height: 0.35rem;
    //   color: #313131;
    //   cursor: pointer;
    // }
    // & > span:hover {
    //   color: var(--main-color);
    // }

    &:nth-of-type(n + 6) {
      .ml-serial {
        margin-top: 0.05rem;
        line-height: 0.25rem;
        color: #959595;
        background-color: transparent;
      }
    }

    .reset-manuscript-title {
      // max-height: 56px;
      // overflow: auto;
      font-size: 14px;
      // @include scrollBar;
    }
  }

  .cl-info {
    color: #959595;
    margin: 0.125rem 0;
    .cl-info-1 {
      padding: 0.025rem 0.075rem;
      color: #fff;
      border-radius: var(--main-border-radius);
      background-color: #c79e61;
    }
    span {
      margin-right: 24px;
    }
  }

  .cl-usage-count_wrapper {
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
    color: #959595;
  }

  .cl-usage-count {
    display: flex;
    flex-wrap: nowrap;
    flex-shrink: 0;
    flex-grow: 1;
    // margin-right: 0.15rem;
  }
  .usage-count-item {
    // width: 1.75rem;
    flex-grow: 1;
    line-height: 0.35rem;
    flex-shrink: 0;
    // margin-left: 0.3rem;
    .uc-icon {
      display: inline-block;
      width: 0.25rem;
      height: 0.25rem;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      vertical-align: -0.05rem;
    }
    .uc-icon__hot-gray {
      background-image: url('~@/assets/imgs/spreadOverview/ManuscriptSpreadRanking/icon-hot-gray.png');
    }
    .uc-icon__hot-light {
      background-image: url('~@/assets/imgs/spreadOverview/ManuscriptSpreadRanking/icon-hot-light.png');
    }
    .uc-icon__reprint {
      background-image: url('~@/assets/imgs/spreadOverview/ManuscriptSpreadRanking/icon-reprint-light.png');
    }
    .uc-icon__play {
      background-image: url('~@/assets/imgs/spreadOverview/ManuscriptSpreadRanking/icon-play-light.png');
    }
    .uc-icon__comment {
      background-image: url('~@/assets/imgs/spreadOverview/ManuscriptSpreadRanking/icon-comment-light.png');
    }
    .uc-icon__like {
      background-image: url('~@/assets/imgs/spreadOverview/ManuscriptSpreadRanking/icon-like-light.png');
    }
    .uc-icon__read {
      background-image: url('~@/assets/imgs/spreadOverview/ManuscriptSpreadRanking/icon-read-light.png');
    }
    .uc-icon__star {
      background-image: url('~@/assets/imgs/spreadOverview/ManuscriptSpreadRanking/icon-star-light.png');
    }
    .uc-icon__watching {
      width: 0.3rem;
      height: 0.3rem;
      background-image: url('~@/assets/imgs/spreadOverview/ManuscriptSpreadRanking/icon-watching-light.png');
    }
    span {
      color: #eb6a43;
    }
  }
}
.chuanboli-list-item:nth-of-type(n + 4) {
  .medal {
    width: 0.25rem;
    height: 0.25rem;
    line-height: 0.25rem;
  }
}
.chuanboli-list-item:nth-of-type(n + 6) {
  .ml-serial {
    color: #7e6b5a;
    background-color: transparent;
  }
}
.chuanboli-list-item:not(.chuanboli-list-item:first-of-type) {
  // padding: .25rem 0 0 0;
  border-top: dashed 1px #d6d6d6;
}
</style>
