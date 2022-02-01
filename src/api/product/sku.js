import request from '@/utils/request'

export const reqSkuList = (page, limit) => request(`/admin/product/list/${page}/${limit}`)
