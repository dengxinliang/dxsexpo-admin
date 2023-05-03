import request from '@/utils/request'

export const recruit = (params: any) =>
  request({
    url: '/stage-api/recruit',
    method: 'get',
    params
  })

export const recruitAdd = (data: any) =>
  request({
    url: '/stage-api/recruit',
    method: 'post',
    data
  })

export const recruitEdit = (data: any) =>
  request({
    url: '/stage-api/recruit',
    method: 'put',
    data
  })
