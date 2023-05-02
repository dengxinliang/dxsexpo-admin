import request from '@/utils/request'

export const information = (params: any) =>
  request({
    url: '/stage-api/information',
    method: 'get',
    params
  })

export const informationAdd = (data: any) =>
  request({
    url: '/stage-api/information',
    method: 'post',
    data
  })

export const informationEdit = (data: any) =>
  request({
    url: '/stage-api/information',
    method: 'put',
    data
  })

export const informationDel = (id: number) =>
  request({
    url: '/stage-api/information/' + id,
    method: 'delete'
  })
