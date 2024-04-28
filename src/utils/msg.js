
function alertMsg(msg, type) {
    this.$message({
        type: type,
        message: msg,
        center: true,
        offset: 2000
    })
}


export default alertMsg
