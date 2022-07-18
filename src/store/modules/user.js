import {loginByUsername, loginBySocial, registerByUsername, logout, getUserInfo} from '@/api/admin/login'
import {wxLogin, wxLoginByCode} from '@/api/wechat/wxLogin'
import { setToken, removeToken, setRefreshToken, setExpiresIn,removeRefreshToken } from '@/utils/auth'
import { setStore, getStore } from '@/utils/store'
import { encryption } from '@/utils/util'

const user = {
  state: {
    userInfo: getStore({
      name: 'userInfo'
    }) || {},
    permissions: getStore({
      name: 'permissions'
    }) || {},
    roles: getStore({
      name: 'roles'
    }) || [],
    menu: getStore({
      name: 'menu'
    }) || [],
    isInitMenu: getStore({
      name: 'isInitMenu'
    }) || false,
    access_token: getStore({
      name: 'access_token'
    }) || '',
    refresh_token: getStore({
      name: 'refresh_token'
    }) || '',
    tenantCode: getStore({
      name: 'tenantCode'
    }) || ''
  },
  actions: {
    // 根据用户名登录
    LoginByUsername ({ commit, state, dispatch }, userInfo) {

      const username = userInfo.username.trim();
      const password = userInfo.password;
      const code = userInfo.code;
      const uuid = userInfo.uuid;

      return new Promise((resolve, reject) => {

        // 根据用户名、密码、租户code登录
        loginByUsername(username,password, code, uuid).then(response => {
          const data = response.data
          setToken(data.access_token)
          setExpiresIn(data.expires_in)
          setRefreshToken(data.access_token)
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.access_token)
          commit('SET_TENANT_CODE', data.tenantCode)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 微信OpenID登录
    loginByWxOpenId ({ commit, state, dispatch }, openId) {
      return new Promise((resolve, reject) => {

        // 根据用户名、密码、租户code登录
        wxLogin(openId).then(response => {

          const data = response.data
          setToken(data.access_token)
          setExpiresIn(data.expires_in)
          setRefreshToken(data.access_token)
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.access_token)
          commit('SET_TENANT_CODE', data.tenantCode)
          resolve()

        }).catch(error => {
          reject(error)
        })
      })
    },

    // 微信Code登录
    loginByWxCode ({ commit, state, dispatch }, code) {
      return new Promise((resolve, reject) => {
        // 根据用户名、密码、租户code登录
        wxLoginByCode(code).then(response => {
          const data = response.data
          setToken(data.access_token)
          setExpiresIn(data.expires_in)
          setRefreshToken(data.access_token)
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.access_token)
          commit('SET_TENANT_CODE', data.tenantCode)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },


    // 根据手机号登录
    LoginBySocial ({ commit, state, dispatch }, userInfo) {
      return new Promise((resolve, reject) => {
        const user = encryption({
          data: userInfo,
          key: '1234567887654321',
          param: ['credential']
        })
        // 根据用户手机号、短信验证码获取token
        loginBySocial(user.phone, user.code).then(response => {
          const data = response.data
          setToken(data.access_token)
          setRefreshToken(data.refresh_token)
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          commit('SET_TENANT_CODE', data.tenantCode)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    RegisterByUsername ({ commit, state, dispatch }, userInfo) {
      return new Promise((resolve, reject) => {

        registerByUsername(userInfo).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserInfo ({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response
          commit('SET_ROLES', data.roles)
          commit('SET_USER_INFO', data.user)
          commit('SET_PERMISSIONS', data.permissions)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.access_token, state.refresh_token).then(() => {
          // 清除权限
          commit('SET_PERMISSIONS', [])
          // 清除用户信息
          commit('SET_USER_INFO', {})
          commit('SET_ACCESS_TOKEN', '')
          commit('SET_REFRESH_TOKEN', '')
          commit('SET_ROLES', [])
          // 清除系统配置信息
          commit('SET_SYS_CONFIG', {})
          // 清除租户信息
          commit('SET_TENANT_CODE', {})
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 注销session
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        // 清除权限
        commit('SET_PERMISSIONS', [])
        // 清除用户信息
        commit('SET_USER_INFO', {})
        commit('SET_ACCESS_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        commit('SET_ROLES', [])
        // 清除系统配置信息
        commit('SET_SYS_CONFIG', {})
        // 清除租户信息
        commit('SET_TENANT_CODE', {})
        removeToken()
        removeRefreshToken()
        resolve()
      })
    },
    ClearCache({commit}){
      // 清除权限
      commit('SET_PERMISSIONS', [])
      // 清除用户信息
      commit('SET_USER_INFO', {})
      commit('SET_ACCESS_TOKEN', '')
      commit('SET_REFRESH_TOKEN', '')
      commit('SET_ROLES', [])
      // 清除系统配置信息
      commit('SET_SYS_CONFIG', {})
      // 清除租户信息
      commit('SET_TENANT_CODE', {})
      removeToken()
      removeToken()
    }
  },
  mutations: {
    SET_ACCESS_TOKEN: (state, accessToken) => {
      state.access_token = accessToken
      setStore({
        name: 'access_token',
        content: state.access_token
      })
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
      setStore({
        name: 'userInfo',
        content: state.userInfo
      })
    },
    SET_REFRESH_TOKEN: (state, rfToken) => {
      state.refresh_token = rfToken
      setStore({
        name: 'refresh_token',
        content: state.refresh_token
      })
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
      setStore({
        name: 'roles',
        content: state.roles
      })
    },
    SET_PERMISSIONS: (state, permissions) => {
      const list = {}
      for (let i = 0; i < permissions.length; i++) {
        list[permissions[i]] = true
      }
      state.permissions = list
      setStore({
        name: 'permissions',
        content: state.permissions
      })
    },
    SET_TENANT_CODE: (state, tenantCode) => {
      state.tenantCode = tenantCode
      setStore({
        name: 'tenantCode',
        content: state.tenantCode
      })
    }
  }
}
export default user
