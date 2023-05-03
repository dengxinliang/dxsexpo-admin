import request from '@/utils/request'

export const banner = (params: any) =>
  request({
    url: '/stage-api/banner',
    method: 'get',
    params
  })

export const bannerAdd = (data: any) =>
  request({
    url: '/stage-api/banner',
    method: 'post',
    data
  })

export const bannerEdit = (data: any) =>
  request({
    url: '/stage-api/banner',
    method: 'put',
    data
  })

export const bannerDel = (id: number) =>
  request({
    url: '/stage-api/banner/' + id,
    method: 'delete'
  })
