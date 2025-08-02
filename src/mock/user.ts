import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/user/info',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          id: 1,
          name: '@CNAME', // ✅ 中文姓名，如“李娜”
          avatar: 'https://picsum.photos/200/300',
          email: '@EMAIL',
          city: '@CTITLE', // ✅ 中文标题/城市名，如“北京市”
          department: '@CTITLE(3)', // 3个汉字的中文词
          createTime: '@DATETIME',
          desc: '@CSentence(10, 20)' // ✅ 中文句子，10~20字
        },
        message: 'success'
      }
    }
  },
  {
    url: '/api/user/list',
    method: 'get',
    response: ({ query }: { query: Record<string, string | number> }) => {
      const { page = 1, size = 10 } = query
      const list = Array(Number(size))
        .fill(0)
        .map((_, index) => ({
          id: (Number(page) - 1) * Number(size) + index + 1,
          name: '@CNAME',
          email: '@EMAIL',
          department: '@CWORD(6)',
          status: '@BOOLEAN'
        }))

      return {
        code: 200,
        data: {
          list,
          total: 100,
          page: Number(page),
          size: Number(size)
        },
        message: 'success'
      }
    }
  },
  {
    url: '/api/user/login',
    method: 'post',
    timeout: 1000, // 模拟 1s 延迟
    response: ({ body }: { body: Record<string, unknown> }) => {
      const { username, password } = body
      if (username === 'admin' && password === '123456') {
        return {
          code: 200,
          data: {
            token: 'fake-jwt-token-1234567890',
            userId: 1,
            role: 'admin'
          },
          message: '登录成功'
        }
      } else {
        return {
          code: 401,
          data: null,
          message: '用户名或密码错误'
        }
      }
    }
  },
  {
    url: '/api/slow-data',
    method: 'get',
    timeout: 10000, // 10秒超时
    response: () => {
      return {
        code: 200,
        data: '这是一条慢请求'
      }
    }
  }
] as MockMethod[]
