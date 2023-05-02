import request from '@/utils/request'

export const exhibitionPlan = (params: any) =>
  request({
    url: '/stage-api/exhibition-plan',
    method: 'get',
    params
  })

export const exhibitionPlanAdd = (data: any) =>
  request({
    url: '/stage-api/exhibition-plan',
    method: 'post',
    data
  })

export const exhibitionPlanEdit = (data: any) =>
  request({
    url: '/stage-api/exhibition-plan',
    method: 'put',
    data
  })

export const exhibitionPlanDel = (id: number) =>
  request({
    url: '/stage-api/exhibition-plan/' + id,
    method: 'delete'
  })
