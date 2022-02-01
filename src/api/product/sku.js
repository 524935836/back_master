import request from '@/utils/request'

export const reqSkuList = (page, limit) => request(`/admin/product/list/${page}/${limit}`)

export const reqSale = (skuId) => request(`/admin/product/onSale/${skuId}`)

export const reqCancel = (skuId) => request(`/admin/product/cancelSale/${skuId}`)

export const reqSkuInfo = (skuId) => request(`/admin/product/getSkuById/${skuId}`)
