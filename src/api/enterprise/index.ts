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

export const companyInfo = (params: any) =>
  request({
    url: '/stage-api/company-info',
    method: 'get',
    params
  })

export const companyInfoAdd = (data: any) =>
  request({
    url: '/stage-api/company-info',
    method: 'post',
    data
  })

export const companyInfoEdit = (data: any) =>
  request({
    url: '/stage-api/company-info',
    method: 'put',
    data
  })

export const depart = (params: any) =>
  request({
    url: '/stage-api/depart',
    method: 'get',
    params
  })

export const departAdd = (data: any) =>
  request({
    url: '/stage-api/depart',
    method: 'post',
    data
  })

export const departEdit = (data: any) =>
  request({
    url: '/stage-api/depart',
    method: 'put',
    data
  })
