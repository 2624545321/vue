// enum ListType {
//   'text', 'picture', 'picture-card'
// }
export interface CustomUploadProps {
  action: string
  showFileList?: boolean
  modelValue?: string
  listType?: 'text' | 'picture' | 'picture-card'
  customFileList?: string[]
}
