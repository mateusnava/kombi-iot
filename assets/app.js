const app = new Vue({
  el: '#app',
  data() {
    return ({
      data: {
        in: {},
        out: {}
      },
    })
  },
  methods: {
    newData: (data) => {
      const item = {
        ...data,
        time: Date.now()
      }
      const items = JSON.parse(localStorage.getItem('items') || '[]')
      items.push(item)
      if (items.length > 100) {
        items.shift()
      }
      localStorage.setItem('items', JSON.stringify(items))
    },
    getSavedItems: () => {
      return JSON.parse(localStorage.getItem('items') || '[]').sort((a, b) => b.time - a.time)
    }
  },
  mounted () {
    const fetchData = () => {
      this.loading = true
      return fetch('/data')
        .then(async (response) => {
          const fakeData = {in: {temperature: 20, humidity: 30}}
          this.data = await response.json()
          this.newData(this.data)
        })
    }
    fetchData()
  }
})