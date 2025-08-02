import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/articles',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: Array(10)
          .fill(0)
          .map((_, i) => ({
            id: i + 1,
            title: '@SENTENCE(6)',
            content: '@PARAGRAPH(2)',
            author: '@NAME',
            views: '@INTEGER(100, 10000)',
            likes: '@INTEGER(10, 500)',
            createTime: '@DATETIME',
            status: ['published', 'draft'][Math.random() > 0.5 ? 1 : 0]
          })),
        message: 'success'
      }
    }
  }
] as MockMethod[]
