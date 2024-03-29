import { setStore, getStore, removeStore } from '@/utils/store'
import { TENANT_CODE } from '../../config/prod.env'

import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const ExpiresInKey = 'Admin-Expires-In'

export function getToken () {
  return getStore({ name: 'access_token' })
}

export function setToken (token) {
  return setStore({ name: 'access_token' }, token)
}

export function removeToken () {
  return removeStore({ name: 'access_token' })
}

export function getRefreshToken () {
  return getStore({ name: 'refresh_token' })
}

export function setRefreshToken (token) {
  return setStore({ name: 'refresh_token' }, token)
}

export function removeRefreshToken () {
  return removeStore({ name: 'refresh_token' })
}

export function getTenantCode () {
  if (TENANT_CODE !== undefined) {
    return TENANT_CODE
  }
  return getStore({ name: 'tenantCode' })
}

export function getExpiresIn() {
  return Cookies.get(ExpiresInKey) || -1
}

export function setExpiresIn(time) {
  return Cookies.set(ExpiresInKey, time)
}
