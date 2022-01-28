import request from '@/utils/request'

export const reqTradeMarkList = (page, limit) => request(`/admin/product/baseTrademark/${page}/${limit}`)

export const reqAddOrUpdateTradeMark = (tradeMark) => {
  if (tradeMark.id) {
    return request({ url: '/admin/product/baseTrademark/update', data: tradeMark, method: 'put' })
  } else {
    return request({ url: '/admin/product/baseTrademark/save', data: tradeMark, method: 'post' })
  }
}

export const reqDeleteTradeMark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })
