import { eventMixin } from './scroll/event'
import { initMixin } from './scroll/init'
import { coreMixin } from './scroll/core'
import { snapMixin } from './scroll/snap'
import { wheelMixin } from './scroll/wheel'
import { scrollbarMixin } from './scroll/scrollbar'
import { pullDownMixin } from './scroll/pulldown'
import { pullUpMixin } from './scroll/pullup'

import { warn } from './util/debug'

// 滚动 容器的长度或宽度 小于内容的长度或宽度就会出现滚动
// 如果是移动端 用touch 手指在滑动， 内容的移动可以用transform来实现 也可以用绝对定位left top来实现
// BScroll 对象的 el为要滚动的元素 options 为配置参数
function BScroll(el, options) {
  this.wrapper = typeof el === 'string' ? document.querySelector(el) : el
  if (!this.wrapper) {
    warn('can not resolve the wrapper dom')
  }
  this.scroller = this.wrapper.children[0]
  if (!this.scroller) {
    warn('the wrapper need at least one child element to be scroller')
  }
  // cache style for better performance
  this.scrollerStyle = this.scroller.style
  // 初始化滚动
  this._init(el, options)
}
// 预处理后 顺序执行的时候都处理过了 所以上面的this._init 可用
initMixin(BScroll)
coreMixin(BScroll)
eventMixin(BScroll)
snapMixin(BScroll)
wheelMixin(BScroll)
scrollbarMixin(BScroll)
pullDownMixin(BScroll)
pullUpMixin(BScroll)

BScroll.Version = '1.4.1'

export default BScroll

