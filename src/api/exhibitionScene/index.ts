import request from '@/utils/request'

export const exhibitionScene = (params: any) =>
  request({
    url: '/stage-api/exhibition-scene',
    method: 'get',
    params
  })

export const exhibitionSceneAdd = (data: any) =>
  request({
    url: '/stage-api/exhibition-scene',
    method: 'post',
    data
  })

export const exhibitionSceneEdit = (data: any) =>
  request({
    url: '/stage-api/exhibition-scene',
    method: 'put',
    data
  })

export const exhibitionSceneDel = (id: number) =>
  request({
    url: '/stage-api/exhibition-scene/' + id,
    method: 'delete'
  })
