let elementStyle = document.createElement('div').style

// vendor ： webkit/Moz/O/ms/standard/false
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()
// 给样式加前缀 如 transform  如果是 webkit就是 webkitTransform 如果是 ms 就是 msTransform
function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
// 绑定事件
export function addEvent(el, type, fn, capture) {
  el.addEventListener(type, fn, {passive: false, capture: !!capture})
}
// 删除事件
export function removeEvent(el, type, fn, capture) {
  el.removeEventListener(type, fn, {passive: false, capture: !!capture})
}

export function offset(el) {
  let left = 0
  let top = 0

  while (el) {
    left -= el.offsetLeft
    top -= el.offsetTop
    el = el.offsetParent
  }

  return {
    left,
    top
  }
}

let transform = prefixStyle('transform')

export const hasPerspective = prefixStyle('perspective') in elementStyle
// 'ontouchstart' in window 判断是否是移动端  ontouchstart存在于window中，但他的值可能是null
// 浏览器调成 移动端window的property中有 ontouchstart，不调无
// 在浏览器的控制台中打印window 会打印出 创造window对象实例的 对象Window
export const hasTouch = 'ontouchstart' in window
export const hasTransform = transform !== false
export const hasTransition = prefixStyle('transition') in elementStyle
// trasition是 transition-property transition-duration transition-timing-function transition-delay的缩写
// trasitionEnd transition动画结束后触发
// animation 需要和帧配合使用
// transform－orign 动画的基点
export const style = {
  transform,
  transitionTimingFunction: prefixStyle('transitionTimingFunction'),
  transitionDuration: prefixStyle('transitionDuration'),
  transitionProperty: prefixStyle('transitionProperty'),
  transitionDelay: prefixStyle('transitionDelay'),
  transformOrigin: prefixStyle('transformOrigin'),
  transitionEnd: prefixStyle('transitionEnd')
}

export const TOUCH_EVENT = 1
export const MOUSE_EVENT = 2

export const eventType = {
  touchstart: TOUCH_EVENT,
  touchmove: TOUCH_EVENT,
  touchend: TOUCH_EVENT,

  mousedown: MOUSE_EVENT,
  mousemove: MOUSE_EVENT,
  mouseup: MOUSE_EVENT
}
// 获取元素的宽高 位置
export function getRect(el) {
  if (el instanceof window.SVGElement) {
    var rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

export function preventDefaultException(el, exceptions) {
  for (let i in exceptions) {
    if (exceptions[i].test(el[i])) {
      return true
    }
  }
  return false
}
// e event 事件 有pageX
// 自定义事件  紧接着触发
export function tap(e, eventName) {
  let ev = document.createEvent('Event')
  ev.initEvent(eventName, true, true)
  ev.pageX = e.pageX
  ev.pageY = e.pageY
  e.target.dispatchEvent(ev)
}

export function click(e) {
  var target = e.target

  if (!(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName)) {
    let ev = document.createEvent(window.MouseEvent ? 'MouseEvents' : 'Event')
    // cancelable 设置为 false 是为了解决和 fastclick 冲突问题
    ev.initEvent('click', true, false)
    ev._constructed = true
    target.dispatchEvent(ev)
  }
}

export function prepend(el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

export function before(el, target) {
  target.parentNode.insertBefore(el, target)
}
