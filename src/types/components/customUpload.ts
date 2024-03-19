// enum ListType {
//   'text', 'picture', 'picture-card'
// }
import type { UploadUserFile } from 'element-plus'
export interface CustomUploadProps {
  action: string
  showFileList?: boolean
  modelValue?: string
  listType?: 'text' | 'picture' | 'picture-card'
  customFileList?: UploadUserFile[]
}
