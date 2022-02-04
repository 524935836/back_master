
import mockRequest from '@/utils/mockRequest'

const state = {
  list: {}
}

const mutations = {
  GETDATA(state, list) {
    state.list = list
  }
}

const actions = {
  async getData({ commit }) {
    try {
      const res = await mockRequest.get('/home/list')
      commit('GETDATA', res.data)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
