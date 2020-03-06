const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#03A9F4',
        // brand: '#03A9F4',
        unanswered: '#999999',
        correct: '#0288d1',
        wrong: '#e57373'
      }
    }
  }
})

const Search = { template: '#search' }
const Contact = { template: '#contact' }

const store = new Vuex.Store({
  state: {
    questions: []
  },
  mutations: {
    setQuestions(state, arr) {
      // console.log(arr)
      state.questions = arr
    }
  },
  actions: {
    getQuestions({commit}) {
      axios.get('./questions.json').then(res => {
        // console.log(res.data)
        commit('setQuestions', res.data)
      })
    }
  },
  // getters: {}
})


const app = new Vue({
  el: '#app',
  vuetify,
  store,
  computed: {
    keywordSplit() {
      const keywordReplaced = this.input.keyword.replace(/　+/g, ' ')
      return keywordReplaced.split(' ').filter(v => v)
    },
    filteredQuestions() {
      console.log(this.$store.state.questions)
      const filtered = this.$store.state.questions.filter(q => {
        return true
      })
      return filtered
    }
  },
  methods: {},
  data() {
    return {
      drawer: {
        show: false,
        selected: ''
      },
      input: {
        keyword: 'test'
      },
      panel: [0]
    }
  },
  mounted() {
    console.log('mounted')
    this.$store.dispatch('getQuestions')
  }
})
// }).$mount('#app')