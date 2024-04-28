/**
 * @desc 前端导出 excel 功能
 * @param { array } excelData 数据
 * @param { object } option 配置项
 * @param { array } option.thead 表头
 * @param { function } option.customRow 自定义行数据
 * @param { string } option.fileName 导出的文件名字
 *
 */
export const exportToExcel = (excelData, option) => {
  var option = option || {}
  const { thead, customRow, fileName } = option
  let excel = '<table>'
  // 生成表头
  //   let row =
  //     '<tr>' + '<td>标题1</td>' + '<td>标题2</td>' + '<td>标题3</td>' + '</tr>'
  let row = '<tr>'
  Array.isArray(thead) &&
    thead.forEach(th => {
      row += `<td>${th}</td>`
    })
  excel += row + '</tr>'
  // 循环生成表身
  const isCustomRow = customRow && typeof customRow === 'function'
  for (let i = 0; i < excelData.length; i++) {
    excel += '<tr>'
    if (isCustomRow) {
      excel += customRow(excelData[i], i)
    } else {
      for (let item in excelData[i]) {
        //增加\t为了不让表格显示科学计数法或者其他格式
        if (!excelData[i][item]) {
          excelData[i][item] = ''
        }
        excel += `<td>${excelData[i][item] + '\t'}</td>`
      }
    }
    excel += '</tr>'
  }
  excel += '</table>'
  //下载的表格模板数据
  var excelFile =
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
    'xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
  excelFile +=
    '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
  excelFile +=
    '<meta http-equiv="content-type" content="application/vnd.ms-excel"'
  excelFile += ' charset="UTF-8">'
  excelFile += '<head>'
  excelFile += '<!--[if gte mso 9]>'
  excelFile += '<xml>'
  excelFile += '<x:ExcelWorkbook>'
  excelFile += '<x:ExcelWorksheets>'
  excelFile += '<x:ExcelWorksheet>'
  excelFile += '<x:Name>'
  excelFile += 'sheet'
  excelFile += '</x:Name>'
  excelFile += '<x:WorksheetOptions>'
  excelFile += '<x:DisplayGridlines/>'
  excelFile += '</x:WorksheetOptions>'
  excelFile += '</x:ExcelWorksheet>'
  excelFile += '</x:ExcelWorksheets>'
  excelFile += '</x:ExcelWorkbook>'
  excelFile += '</xml>'
  excelFile += '<![endif]-->'
  excelFile += '</head>'
  excelFile += '<body>'
  excelFile += excel
  excelFile += '</body>'
  excelFile += '</html>'
  //下载模板
  let uri =
    'data:application/vnd.ms-excelcharset=utf-8,' +
    encodeURIComponent(excelFile)
  let link = document.createElement('a')
  link.href = uri
  link.style = 'visibility:hidden'
  let myDate = new Date()
  let time = myDate
    .toLocaleDateString()
    .split('/')
    .join('-')
  link.download = fileName || '表格' + time + '.xls'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
