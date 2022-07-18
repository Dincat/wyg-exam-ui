import { setStore, getStore } from '@/utils/store'
import { getSysConfig } from '@/api/config'

const sysConfig = {
  state: {
    sysConfig: getStore({
      name: 'sys_config'
    }) || {}
  },
  actions: {
    // 获取系统配置
    GetSysConfig ({ commit }) {
      return new Promise((resolve, reject) => {
        getSysConfig().then(response => {
          const arr = response.data

          var map=new Map();
          for(var i=0;i<arr.length;i++){
            var item=arr[i];
            map.set(item.configKey,item.configValue);
          }

          commit('SET_SYS_CONFIG', map);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  mutations: {
    SET_SYS_CONFIG: (state, sysConfig) => {
      state.sysConfig = sysConfig
      setStore({
        name: 'sys_config',
        content: state.sysConfig
      })
    }
  }
}
export default sysConfig
