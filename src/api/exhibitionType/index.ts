import request from '@/utils/request'

export const industryCategory = (params: any) =>
  request({
    url: '/stage-api/industry-category',
    method: 'get',
    params
  })

export const industryCategoryAdd = (data: any) =>
  request({
    url: '/stage-api/industry-category',
    method: 'post',
    data
  })

export const industryCategoryEdit = (data: any) =>
  request({
    url: '/stage-api/industry-category',
    method: 'put',
    data
  })

export const industryCategoryDel = (id: number) =>
  request({
    url: '/stage-api/industry-category/' + id,
    method: 'delete'
  })
