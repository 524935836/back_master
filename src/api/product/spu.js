import request from '@/utils/request'

export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, params: { category3Id }})

export const reqSpuInfo = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}` })

export const reqTradeMarkList = () => request('/admin/product/baseTrademark/getTrademarkList')

export const reqSpuImageList = (spuId) => request(`/admin/product/spuImageList/${spuId}`)

export const reqBaseSaleAttrList = () => request('/admin/product/baseSaleAttrList')

export const reqAddOrUpdateSpu = (spuInfo) => {
  if (spuInfo.id) {
    return request({ url: '/admin/product/updateSpuInfo', data: spuInfo, method: 'post' })
  } else {
    return request({ url: '/admin/product/saveSpuInfo', data: spuInfo, method: 'post' })
  }
}

export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })

// 添加sku
export const reqSpuSaleAttrList = (spuId) => request(`/admin/product/spuSaleAttrList/${spuId}`)

export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)

export const reqSaveSkuInfo = (skuInfo) => request({ url: '/admin/product/saveSkuInfo', method: 'post', data: skuInfo })
