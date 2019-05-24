const state = {
  count: 0,
  content: 'monitorContent'
}

const getters = {
  currentCount: state => {
    return state.count
  }
}

const mutations = {
  CHANGE_COUNT (state) {
    state.count = state.count + 1
  }
}

const actions = {
  plusCount: ({ commit }) => {
    commit('CHANGE_COUNT')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
