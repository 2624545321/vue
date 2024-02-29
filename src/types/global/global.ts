declare type Pagination<T = number> = {
  currentPage: T
  pageSize: T
  total: T
}

declare type ReqPagination<T = number> = {
  page: T
  limit: T
}
