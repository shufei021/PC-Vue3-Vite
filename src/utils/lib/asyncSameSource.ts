type NameType = string

// 异步同源对象
const asyncSameSource = {
  map: new Map(), // 任务对象
  waitMap: new Map(), // 等待map对象

  // 缓存中是否有该任务
  has(name: NameType) {
    return this.map.has(name)
  },

  // 从缓存中获取该任务的结果
  get(name: NameType) {
    return this.map.get(name)
  },

  // 缓存该任务的结果
  set(name: NameType, value: unknown) {
    this.map.set(name, value)
  },

  // 删除该任务的结果
  delete(name: NameType) {
    this.map.delete(name)
  },

  // 添加等待该任务结果的函数
  wait<T>(
    name: NameType,
    resolve: (value: T) => void,
    reject: (reason?: T) => void
  ) {
    const waits = this.waitMap.get(name) || []
    waits.push({ resolve, reject })
    this.waitMap.set(name, waits)
  },

  // 派发等待该任务结果的函数
  dispatchWait<T>(name: NameType, val: T, isError: boolean = false) {
    if (this.waitMap.has(name)) {
      const waits = this.waitMap.get(name)
      for (let i = 0; i < waits.length; i++) {
        const wait = waits[i]
        if (isError) {
          wait.reject(val)
        } else {
          wait.resolve(val)
        }
      }
      this.waitMap.delete(name) // 派发完成后清理等待队列
    }
  },

  // 获取结果函数
  getResult<T>(
    name: NameType, // 任务名字，字符串类型
    requestApi: () => Promise<T>, // 请求接口，返回是一个promise
    cache = false // 是否缓存结果
  ): Promise<T> {
    // 任务名字
    const TaskName = `${name}TaskName`
    // 出错任务名字
    const TaskErrName = `${name}TaskErrName`

    // 如果缓存中没有这个任务，同时这个任务也没有出错
    if (!this.has(name) && !this.has(TaskName)) {
      // 那么对该次任务进行状态标记，关闭 if 入口，让后面相同任务进入 else 入口
      this.set(TaskName, true)
      // 开始请求数据
      return requestApi()
        .then((result: T) => {
          // 成功请求数据后
          // 将成功返回的数据结果设置到缓存中
          this.set(name, result)
          // 触发等待任务列表，进行通知，当然是成功的通知，一对都对
          this.dispatchWait(name, result)
          // 返回结果
          return result
        })
        .catch((err: unknown) => {
          // 失败
          // 缓存错误任务
          this.set(TaskErrName, err)
          // 触发等待任务列表，进行通知， 当然是失败的通知，一错都错
          this.dispatchWait(name, err, true)
          // 抛出错误
          throw err
        })
        .finally(() => {
          // 成功失败与否，都已经出了结果，就把缓存标记状态删除，任务结束
          this.delete(TaskName)
          // 如果不缓存结果， 缓存1秒后删除 任务 和 错误任务
          if (!cache) {
            // 如果不缓存结果，在1000毫秒内再次发起的相同任务依然使用缓存结果
            setTimeout(() => {
              this.delete(name)
              this.delete(TaskErrName)
            }, 1000)
          }
        })
    } else {
      // 如果同个任务已经在在缓存中了，就走到这里
      return new Promise<T>((resolve, reject) => {
        // 先判断缓存中是否有任务结果
        if (this.has(name)) {
          // 有就直接返回结果
          resolve(this.get(name) as T)
        } else if (this.has(TaskErrName)) {
          // 再判断缓存中是否有该次任务的错误任务
          // 有就直接返回错误
          reject(this.get(TaskErrName))
        } else {
          // 没有就缓存等待任务，等待任务列表中，有结果了，就通知等待任务列表
          this.wait<T>(name, resolve, reject)
        }
      })
    }
  },

  // 清空任务列表
  clear() {
    this.map.clear()
  }
}

export default asyncSameSource
