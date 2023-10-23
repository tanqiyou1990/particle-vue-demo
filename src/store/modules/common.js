
const common = {
  state: {
    language: 'en',
    theme: 'dark'
  },

  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
    },
    SET_THEME: (state, theme) => {
      state.theme = theme
    }
  },

  actions: {

  }
}

export default common
