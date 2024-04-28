function confirmMsg(content, title, type, operation, callBack, confirmText, cancelText) {
  confirmText = confirmText || '确定'
  cancelText = cancelText || '取消'
  const that = this
  this.$confirm(content, title, {
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    type: type
  }).then(function() {
    that.$msg(operation + '成功', 'success')
    callBack()
  }).catch((e) => {
    console.log(e)
    that.$msg('已取消' + operation, 'info')
  })
}

export default confirmMsg
