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
    },
    categories() {
      const arr = !!this.countAllQuestions
        ? this.$store.state.questions.map(q => q.category)
        : []
      return [... new Set(arr)]
    },

    selectsAllCategory() {
      return this.input.selectedCategories.length === this.categories.length
    },
    selectsSomeCategory() {
      return this.input.selectedCategories.length > 0 && !this.selectsAllCategory
    },
    icon() {
      if (this.selectsAllCategory) return 'mdi-close-box'
      if (this.selectsSomeCategory) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    }
  },
  methods: {
    getQuestionsByButton() {
      console.log('button clicked')
      this.$store.dispatch('getQuestions')
    },
    searchQuestions() {
      console.log('function => searchQuestions')
      if (!this.input.selectedCategories.slice().length) {
        this.errorCategory = true
        console.log('カテゴリ不足')
        // ダイアログ処理
        return
      }

      this.showResultArea = true
      const filtered = this.$store.state.questions.filter(q => {
        /* カテゴリによるフィルタリング */
        // q.categoryがinput.selectedCategoriesに入ってるかどうかをチェック
        // (入ってなければその時点でfalseを返す)
        console.log(`input.selectedCategories = ${this.input.selectedCategories}`)
        if(!this.input.selectedCategories.includes(q.category)) {
          return false
        }

        /* 入力したキーワードによるフィルタリング */
        // (マッチングが見つかった時点でtrueを返す、最後まで見つからなければfalse)
        const flag = this.arrWordSplit.every(word => {
          console.log(`対象word => ${word}`)
          // 質問に指定された検索キーワードとのマッチングを判定する
          // q.keywordにinput.wordが入ってるかどうかをチェック
          const keywordLower = q.keyword.map(v => v.toLowerCase())
          console.log(`keywordLower = ${keywordLower}`)

          if(keywordLower.includes(word)) {
            return true
          } 

          // 質問文とのマッチングを判定する
          // q.questionにinput.wordが入ってるかどうかをチェック
          const questionLower = q.question.toLowerCase()
          console.log(`questionLower = ${questionLower}`)
          if(questionLower.includes(word)) {
            return true
          }

          // 回答文とのマッチングを判定する
          // q.answerにinput.wordが入ってるかどうかをチェック
          const answerLower = q.answer.toLowerCase()
          console.log(`answerLower = ${answerLower}`)
          if(answerLower.includes(word)) {
            return true
          }

          // どこにもマッチしなかった = falseを返す
          return false
        })
        console.log(`flag = ${flag}`)
        return flag
      })
      this.filteredQuestions = filtered
    },
    toggle() {
      this.$nextTick(() => {
        if (this.selectsAllCategory) {
          this.input.selectedCategories = []
        } else {
          this.input.selectedCategories = this.categories.slice()
        }
      })
    }
  },
  data() {
    return {
      drawer: {
        show: false,
        selected: ''
      },
      input: {
        word: '',
        selectedCategories: [],
      },
      showResultArea: false,
      filteredQuestions: [],
      panel: [],
      overlay: true
    }
  },
  mounted() {
    console.log('mounted')
    this.$store.dispatch('getQuestions')
  }
})
