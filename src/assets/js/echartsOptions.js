import echarts from 'echarts'
export const spreadChannelOptions = () => {
  return {
    //   color: ['#91CB74', '#250,200,89'],
    tooltip: {
      trigger: 'item',
      // formatter: '{a} <br/>{b}: {c} ({d}%)',
      formatter: '{b}: {c} ({d}%)',
    },
    grid: { top: '0%' },
    legend: {
      orient: 'vertical',
      type: 'scroll',
      height: '80%',
      right: '4%',
      y: 'center',
      show: true,
      itemGap: 20,
    },
    series: [
      {
        name: '',
        type: 'pie',
        selectedMode: 'single',
        radius: ['10%', '75%'],
        label: {
          normal: {
            // position: 'inner',
            textStyle: {
              color: '#313131',
              fontSize: 14,
            },
          },
        },
        labelLine: {
          normal: {
            //   show: false,
            smooth: true,
            length: 8,
            length2: 8,
          },
        },
        data: [],
      },
    ],
  }
}

export const spreadTrendAnalyzeOptions = () => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#57617B',
        },
      },
      formatter(p) {
        const p0 = p[0]
        return `${p0.name}
                    <br />
                    ${p0.marker} 转载量: ${p0.value}
                  `
      },
    },
    grid: {
      left: '4%',
      right: '6%',
      bottom: '8%',
      // top: ''
      containLabel: true,
    },
    legend: {
      show: false,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#57617B', // X 轴坐标颜色
          },
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 14,
            color: '#707070',
          },
        },
        data: [],
      },
    ],
    yAxis: [
      {
        type: 'value',
        // name: '单位（辆）',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#57617B', // Y轴坐标颜色
          },
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 14,
            color: '#707070',
          },
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: 'rgba(200,200,200,1)', //里面横着的虚线
          },
        },
      },
    ],
    series: [
      {
        name: '传播趋势分析',
        type: 'line',
        symbolSize: 6,
        symbol: 'circle',
        lineStyle: {
          normal: {
            color: 'rgba(200,66,57, 1)', // 折线颜色
            width: 1,
            // shadowColor: 'rgba(200,66,57, 0.3)', // 折线阴影颜色
            // shadowOffsetY: 5
          },
        },
        itemStyle: {
          normal: {
            color: 'rgba(200,66,57, 1)', // 折线小圆点颜色
          },
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(200,66,57, 0.2)', // 折线底下区域渐变色
                },
                {
                  offset: 0.8,
                  color: 'rgba(200,66,57, 0.01)', // 折线底下区域渐变色
                },
              ],
              false,
            ),
          },
        },
        data: [],
      },
    ],
  }
}

export const importMediaReshipRankOptions = () => {
  return {
    tooltip: {
      trigger: 'item',
      // formatter: '{a} <br/>{b}: {c} ({d}%)',
      formatter: pam => {
        // console.log(pam)
        if (pam.color === 'rgba(0, 0, 0, 0)') return
        // ${pam.seriesName || ''}
        // <br />
        let str = `
          <div>
            ${pam.marker}
            ${pam.name}
            ${pam.value}
          <div/>
          `
        return str
      },
    },
    grid: { top: '0%' },
    legend: {
      orient: 'vertical',
      x: 'left',
      show: false,
    },
    series: [
      {
        name: '',
        type: 'pie',
        selectedMode: 'single',
        // radius: [0, '26%'],
        radius: [0, '50%'],
        label: {
          normal: {
            position: 'inner',
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [],
      },
      {
        name: '',
        type: 'pie',
        radius: ['62%', '80%'],
        label: {
          normal: {
            // show: false,
            // formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ', // 自带的
            // formatter: '{a|数据}\n{hr|}\n  {b|{b}：}{c|{c}}  {per|{d}%}  ', // 设计图显示的
            // formatter: ' {b|{b}：}{c} ',
            backgroundColor: '#fff',
            borderColor: '#efefef',
            borderWidth: 2,
            borderRadius: 4,
            rich: {
              a: {
                width: '100%',
                height: 28,
                padding: [0, 8],
                lineHeight: 28,
                color: '#1b1b1b',
                align: 'left',
                fontWeight: 700,
                fontSize: 12,
                backgroundColor: '#f8f8f8',
              },
              // abg: {
              //   backgroundColor: '#333',
              //   width: '100%',
              //   height: 28,
              //   color: '#1b1b1b',
              //   align: 'right',
              //   backgroundColor: '#f8f8f8',
              //   borderRadius: [4, 4, 0, 0],
              // },
              hr: {
                borderColor: '#f8f8f8',
                width: '100%',
                borderWidth: 0.5,
                height: 0,
              },
              b: {
                fontSize: 12,
                lineHeight: 33,
                color: '#1b1b1b',
              },
              c: {
                fontSize: 12,
                lineHeight: 33,
                color: '#ef4143',
              },
              per: {
                height: 20,
                fontSize: 12,
                color: '#fff',
                backgroundColor: '#c59d60',
                padding: [0, 4, 2, 4],
                borderRadius: 2,
              },
            },
          },
        },
        labelLine: { smooth: true },
        data: [],
      },
    ],
  }
}
