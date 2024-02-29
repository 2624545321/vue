export type TableColumn = {
  type?: string
  label: string
  prop?: string
  slot?: string
  minWidth?: string | number
  width?: string | number
  className?: string
  labelClassName?: string
  property?: string
  columnKey?: string
  align?: string
  headerAlign?: string
  filterClassName?: string
}

/* @desc tableColumn prop form element table soucre
 type: {
    type: String,
    default: 'default',
  },
  label: String,
  className: String,
  labelClassName: String,
  property: String,
  prop: String,
  width: {
    type: [String, Number],
    default: '',
  },
  minWidth: {
    type: [String, Number],
    default: '',
  },
  renderHeader: Function as PropType<
    TableColumnCtx<DefaultRow>['renderHeader']
  >,
  sortable: {
    type: [Boolean, String],
    default: false,
  },
  sortMethod: Function as PropType<TableColumnCtx<DefaultRow>['sortMethod']>,
  sortBy: [String, Function, Array] as PropType<
    TableColumnCtx<DefaultRow>['sortBy']
  >,
  resizable: {
    type: Boolean,
    default: true,
  },
  columnKey: String,
  align: String,
  headerAlign: String,
  showOverflowTooltip: {
    type: [Boolean, Object] as PropType<
      TableColumnCtx<DefaultRow>['showOverflowTooltip']
    >,
    default: undefined,
  },
  fixed: [Boolean, String],
  formatter: Function as PropType<TableColumnCtx<DefaultRow>['formatter']>,
  selectable: Function as PropType<TableColumnCtx<DefaultRow>['selectable']>,
  reserveSelection: Boolean,
  filterMethod: Function as PropType<
    TableColumnCtx<DefaultRow>['filterMethod']
  >,
  filteredValue: Array as PropType<TableColumnCtx<DefaultRow>['filteredValue']>,
  filters: Array as PropType<TableColumnCtx<DefaultRow>['filters']>,
  filterPlacement: String,
  filterMultiple: {
    type: Boolean,
    default: true,
  },
  filterClassName: String,
  index: [Number, Function] as PropType<TableColumnCtx<DefaultRow>['index']>,
  sortOrders: {
    type: Array as PropType<TableColumnCtx<DefaultRow>['sortOrders']>,
    default: () => {
      return ['ascending', 'descending', null]
    },
    validator: (val: TableColumnCtx<unknown>['sortOrders']) => {
      return val.every((order: string) =>
        ['ascending', 'descending', null].includes(order)
      )
    },
  },
*/
