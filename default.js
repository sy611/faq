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
    arrWordSplit() {
      // 全角スペースは半角スペースに置換、アルファベットはすべて小文字に置換
      const wordReplaced = this.input.word.replace(/　+/g, ' ').toLowerCase()
      // スペース連続などによって生まれる空文字を取り除く
      return wordReplaced.split(' ').filter(v => v)
    },
    countAllQuestions() {
      return this.$store.state.questions.length
    }
    // filteredQuestions() {
    //   console.log(this.$store.state.questions)
    //   const filtered = this.$store.state.questions.filter(q => {
    //     const flag = this.arrWordSplit.every(word => {
    //       // q.keywordにinput.wordが入ってるかどうかをチェック
    //       const keywordLower = q.keyword.map(v => v.toLowerCase())
    //       console.log(keywordLower)
    //       console.log(`word = ${word}`)
    //       if(keywordLower.includes(word)) {
    //         return true
    //       } else {
    //         return false
    //       }
    //       // q.questionにinput.word入ってるかどうかをチェック

    //       // return true
    //     })
    //     return flag
    //   })
    //   return filtered
    // }
  },
  methods: {
    getQuestionsByButton() {
      console.log('button clicked')
      this.$store.dispatch('getQuestions')
    },
    searchQuestions() {
      console.log('function => searchQuestions')
      this.showResultArea = true
      const filtered = this.$store.state.questions.filter(q => {
        const flag = this.arrWordSplit.every(word => {
          // q.keywordにinput.wordが入ってるかどうかをチェック
          const keywordLower = q.keyword.map(v => v.toLowerCase())
          console.log(keywordLower)
          console.log(`word = ${word}`)
          if(keywordLower.includes(word)) {
            return true
          } else {
            return false
          }
          // q.questionにinput.word入ってるかどうかをチェック

          // return true
        })
        return flag
      })
      this.filteredQuestions = filtered
    }
  },
  data() {
    return {
      drawer: {
        show: false,
        selected: ''
      },
      input: {
        word: '光'
      },
      showResultArea: false,
      filteredQuestions: [],
      panel: []
    }
  },
  mounted() {
    console.log('mounted')
    // this.$store.dispatch('getQuestions')
  }
})
// }).$mount('#app')


const methodsSearch = {
  checkKeyword() {}
  
}