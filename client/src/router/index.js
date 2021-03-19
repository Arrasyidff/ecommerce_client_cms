import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login-Page'
import MainPage from '../views/MainPage'
import Product from '../views/Product'
import NotFoundPage from '../views/Page404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/main-page',
    name: 'Main Page',
    component: MainPage,
    children: [
      {
        path: 'product',
        name: 'Product',
        component: Product
      }
    ]
  },
  {
    path: '*',
    name: 'NotFoundPage',
    component: NotFoundPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')

  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else if (to.name === 'Login' && isAuthenticated) next({ name: 'Product' })
  else next()
})

export default router
