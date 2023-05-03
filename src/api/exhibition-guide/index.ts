import request from '@/utils/request'

export const exhibitionDesign = (params: any) =>
  request({
    url: '/stage-api/exhibition-design',
    method: 'get',
    params
  })

export const exhibitionDesignAdd = (data: any) =>
  request({
    url: '/stage-api/exhibition-design',
    method: 'post',
    data
  })

export const exhibitionDesignEdit = (data: any) =>
  request({
    url: '/stage-api/exhibition-design',
    method: 'put',
    data
  })

export const exhibitionDesignDel = (id: number) =>
  request({
    url: '/stage-api/exhibition-design/' + id,
    method: 'delete'
  })

export const exhibitionProcess = (params: any) =>
  request({
    url: '/stage-api/exhibition-process',
    method: 'get',
    params
  })

export const exhibitionProcessAdd = (data: any) =>
  request({
    url: '/stage-api/exhibition-process',
    method: 'post',
    data
  })

export const exhibitionProcessEdit = (data: any) =>
  request({
    url: '/stage-api/exhibition-process',
    method: 'put',
    data
  })

export const exhibitionProcessDel = (id: number) =>
  request({
    url: '/stage-api/exhibition-process/' + id,
    method: 'delete'
  })
