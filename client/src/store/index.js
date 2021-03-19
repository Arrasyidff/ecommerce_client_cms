import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosIntance'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    error: ''
  },
  mutations: {
    fetchData (state, payload) {
      state.products = payload
    },
    DataProduct (state, payload) {
      state.product = payload
    },
    errorInputNewProduct (state, payload) {
      state.error = payload
    }
  },
  actions: {
    login (commit, payload) {
      // console.log(payload)
      axios({
        method: 'POST',
        url: 'login/admin',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          router.push('/main-page/product')
          console.log(response.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    fetchData (context) {
      axios({
        url: 'product',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          context.commit('fetchData', response.data)
          console.log(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct (context, id) {
      axios({
        url: 'product/' + id,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          console.log(response.data)
          context.dispatch('fetchData')
        })
        .catch(err => {
          console.log(err.response.data.msg)
        })
    },
    DataProduct (context, id) {
      axios({
        url: 'product/' + id,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          console.log(response.data)
          context.commit('DataProduct', response.data)
        })
        .catch(err => {
          console.log(err.response.data.msg)
        })
    }
  },
  modules: {
  }
})
