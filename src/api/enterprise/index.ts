import request from '@/utils/request'

export const company = (params: any) =>
  request({
    url: '/stage-api/company',
    method: 'get',
    params
  })

export const companyAdd = (data: any) =>
  request({
    url: '/stage-api/company',
    method: 'post',
    data
  })

export const companyEdit = (data: any) =>
  request({
    url: '/stage-api/company',
    method: 'put',
    data
  })
