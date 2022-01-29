import request from '@/utils/request'

export const reqCategory1List = () => request('/admin/product/getCategory1')

export const reqCategory2List = (category1Id) => request(`/admin/product/getCategory2/${category1Id}`)

export const reqCategory3List = (category2Id) => request(`/admin/product/getCategory3/${category2Id}`)

export const reqAttrList = (category1Id, category2Id, category3Id) => request(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)

export const reqAddOrUpdateAttr = (data) => request({ url: '/admin/product/saveAttrInfo', data, method: 'post' })

export const reqDeleteAttr = (attrId) => request({ url: `/admin/product/deleteAttr/${attrId}` })
