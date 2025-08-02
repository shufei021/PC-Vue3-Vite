import type { Directive } from 'vue'

// 定义指令值的类型
interface NumberDirectiveValue {
  max?: number
  min?: number
  digit?: number
  negative?: boolean
  isReplace?: boolean
}

// 创建自定义接口而不是扩展全局HTMLElement(这样可以避免全局命名空间污染，降低冲突风险，同时保持类型安全。)
interface NumberInputHTMLElement extends HTMLElement {
  old?: string
  formatVal?: (newValue: string, isBlur?: boolean) => string
  value: string
  inputHandler?: () => void
  blurHander?: () => void
}

const number: Directive<HTMLInputElement, NumberDirectiveValue> = {
  mounted(el, binding) {
    // 确保处理的是 input 元素
    const inputEl = (
      el.tagName === 'INPUT' ? el : el.querySelector('input')
    ) as NumberInputHTMLElement
    if (!inputEl) return

    // 初始化自定义属性
    inputEl.old = ''

    // 格式化值方法
    inputEl.formatVal = function (newValue: string, isBlur = false) {
      // 移除非法字符
      newValue = newValue.replace(/[^\d.-]/g, '')
      // 处理前导0
      newValue = newValue.replace(/^0+(\d)/, '$1')
      // 处理前导小数点
      newValue = newValue.replace(/^\./, '0.')
      // 创建小数位数正则
      const digitReg = new RegExp(
        `^-?\\d*(\\.?\\d{0,${binding.value?.digit ?? 2}})`,
        'g'
      )
      // 匹配有效数字格式
      const matched = newValue.match(digitReg)
      newValue = matched?.[0] || ''
      // 处理失去焦点时的特殊情况
      if (isBlur)
        newValue = newValue.replace(/(\d+)\.$/, '$1').replace(/^-$/, '')
      return newValue
    }
    //  输入事件
    inputEl.inputHandler = function () {
      const { max, min, digit, negative, isReplace } = binding.value || {}

      let newValue = inputEl.value
      const isNegative = newValue.includes('-')
      const invalidDashes = newValue.match(/-/g)

      // 处理非法负号
      if (
        invalidDashes &&
        invalidDashes.length === 2 &&
        newValue.replace(/-/g, '').length
      ) {
        newValue = newValue.replace(/-/g, '')
      }
      // 增加非空判断
      if (inputEl.formatVal) newValue = inputEl.formatVal(newValue)

      // 处理负号逻辑
      if (!(invalidDashes && invalidDashes.length === 2)) {
        if (inputEl.value.match(/-/g)?.length === 2) {
          newValue = inputEl.value.split('-').join('')
        }
        if (isNegative && negative) {
          newValue = '-' + newValue
        }
      }

      // 处理整数情况
      if (newValue.slice(-1) === '.' && digit === 0) {
        newValue = newValue.replace(/\.$/, '')
      }

      // 处理数值范围
      const numericValue = newValue === '-' ? 0 : Number(newValue)
      if (max !== undefined && numericValue > max) {
        newValue = isReplace ? max.toString() : (inputEl.old ?? '')
      } else if (min !== undefined && numericValue < min) {
        newValue = isReplace ? min.toString() : (inputEl.old ?? '')
      } else {
        inputEl.old = newValue
      }

      // 更新值
      if (newValue !== inputEl.value) {
        inputEl.value = newValue === '-0' ? '0' : newValue
        inputEl.dispatchEvent(new Event('input'))
      }
    }
    // 失去焦点事件
    inputEl.blurHander = function () {
      if (!inputEl.formatVal) return // 添加类型守卫，防止 formatVal 未定义
      const isNegative = inputEl.value.includes('-')
      inputEl.value =
        (isNegative ? '-' : '') + inputEl.formatVal(inputEl.value, true)
      inputEl.dispatchEvent(new Event('input')) // 通知v-model更新
    }

    inputEl.addEventListener('input', inputEl.inputHandler)
    inputEl.addEventListener('blur', inputEl.blurHander)
  },

  beforeUnmount(el) {
    const inputEl = (
      el.tagName === 'INPUT' ? el : el.querySelector('input')
    ) as NumberInputHTMLElement
    if (!inputEl) return

    // 类型守卫 - 确保inputEl.inputHandler存在
    if (inputEl.inputHandler) {
      inputEl.removeEventListener('input', inputEl.inputHandler)
    }
    // 类型守卫 -确保inputEl.blurHander存在
    if (inputEl.blurHander) {
      inputEl.removeEventListener('blur', inputEl.blurHander)
    }

    delete inputEl.old
    delete inputEl.formatVal
    delete inputEl.inputHandler
    delete inputEl.blurHander
  }
}

export default number
