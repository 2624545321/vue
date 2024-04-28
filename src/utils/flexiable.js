//rem设置 layout_width是layout设计宽度
;(function (doc, win) {
	var docEl = doc.documentElement,
		isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
		dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
		dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
		dpr = 1,
		scale = 1 / dpr,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
	docEl.dataset.dpr = dpr
	var metaEl = doc.createElement('meta')
	metaEl.name = 'viewport'
	metaEl.content =
		'initial-scale=' +
		scale +
		',maximum-scale=' +
		scale +
		', minimum-scale=' +
		scale
	docEl.firstElementChild.appendChild(metaEl)
	var recalc = function () {
		var width = docEl.clientWidth
		// if (width / dpr < 1366) {
		if (width / dpr < 1159 ) {
			width = 1366 * dpr
		} else if (width / dpr > 2560) {
			width = 2560 * dpr
		}
		// 乘以100，px : rem = 100 : 1
		// docEl.style.fontSize = 100 * (width / 750) + 'px'
		// 设置成24等份，设计稿时1920px的，这样1rem就是80px
		var rem = width / 24
		docEl.style.fontSize = rem + 'px'
	}
	recalc()
	if (!doc.addEventListener) return
	win.addEventListener(resizeEvt, recalc, false)
})(document, window)