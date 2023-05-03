import request from '@/utils/request'

export const getUsers = (params: any) =>
  request({
    url: '/stage-api/user',
    method: 'get',
    params
  })

export const getUserInfo = (data: any) =>
  request({
    url: '/users/info',
    method: 'post',
    data
  })

export const getUserByName = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'get'
  })

export const addUser = (data: any) =>
  request({
    url: '/stage-api/user',
    method: 'post',
    data
  })

export const updateUser = (data: any) =>
  request({
    url: '/stage-api/user',
    method: 'put',
    data
  })

export const deleteUser = (id: number) =>
  request({
    url: `/stage-api/user/${id}`,
    method: 'delete'
  })

export const login = (data: any) =>
  request({
    url: '/stage-api/users/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

export const register = (data: any) =>
  request({
    url: '/users/register',
    method: 'post',
    data
  })
