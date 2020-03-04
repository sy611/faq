const app = new Vue({
  el: '#app',
  vuetify: new Vuetify({
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
  }),
  computed: {
    keywordSplit() {
      const keywordReplaced = this.input.keyword.replace(/　+/g, ' ')
      return keywordReplaced.split(' ').filter(v => v)
    }
  },
  methods: {},
  data: {
    drawer: {
      show: false,
      selected: ''
    },
    input: {
      keyword: 'test'
    }
  }
})



const store = new Vuex.Store({
  state: {},
  mutations: {

  }
})

const router = new VueRouter({
  routes: [
    {path: '/', component: Home}
  ]
})