// 找到数组的 第一项 的类型
export type FirstItemOfArray<T extends readonly unknown[]> = T extends [
  infer F,
  ...infer _O,
]
  ? F
  : never

// 返回数组的联合类型
export type UnionOfArray<T extends readonly unknown[]> = T[number]
