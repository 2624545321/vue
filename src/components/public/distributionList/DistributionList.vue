<script type="text/jsx">
export default {
  name: 'DistributionList',

  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
    listData: {
      type: Array,
      default: () => [],
    },
  },

  render(h) {
    if (!this.isShow) {
      return <custom-no-data-vue></custom-no-data-vue>
    }

    return <ul class="distribute-list">
      {
        this.listData.map((item, index) => {
          return (
            <li>
              <i class={['ml-serial', 'ml-serial-0' + (index + 1)]}>
                { index + 1 }
              </i>
              <span>{ item.name }</span>
              <span class="last-num">{item.value || 0 }</span>
            </li>
          )
        })
      }
    </ul>
  }
}
</script>
