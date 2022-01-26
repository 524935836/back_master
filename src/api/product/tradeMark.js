import request from '@/utils/request'

export const reqTradeMarkList = (page, limit) => request(`/admin/product/baseTrademark/${page}/${limit}`)
