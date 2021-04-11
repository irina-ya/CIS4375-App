import vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
// home
import index from '../views/home/index.vue'
import feedback from '../views/home/feedback.vue'
import customers from '../views/home/customers.vue'
import serviceorders from '../views/home/serviceorders.vue'
import serviceparts from '../views/home/serviceparts.vue'
import contact from '../views/home/contact.vue'
// error
import notFound from '../views/error/notFound.vue'
// account
import register from '../views/account/register.vue'
import login from '../views/account/login.vue'
import account from '../views/account/index.vue'
//edits
import editcustomer from '../views/edits/editcustomer.vue'
import editservicepart from '../views/edits/editservicepart.vue'
import editserviceorder from '../views/edits/editserviceorder.vue'
import addcar from '../views/edits/addcar.vue'
import addserviceorder from '../views/edits/addserviceorder.vue'

vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  root: '/',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: index,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/customers',
      name: "customers",
      component: customers,
      //meta: {
      //  isOpen: true,
      //},
    },
    {
      path: '/customers/editcustomer',
      name: "/customers/editcustomer",
      props: true,
      component: editcustomer,
      //meta: {
      //  isOpen: true,
      //},
    },
    {
      path: '/serviceorders',
      component: serviceorders,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/serviceorders/editserviceorder',
      name: "/serviceorders/editserviceorder",
      props: true,
      component: editserviceorder,
    },
    {
      path: '/addserviceorder',
      name: "addserviceorder",
      component: addserviceorder,
      props: true

    },
    {
      path: '/serviceparts',
      component: serviceparts,
      meta: {
        isOpen: true,
      },
    },
    {
      path: '/addcar',
      name: "addcar",
      component: addcar,
      props: true

    },
    {
      path: '/serviceparts/editservicepart',
      name: "/serviceparts/editservicepart",
      props: true,
      component: editservicepart
    },
    {
      path: '/auth/register',
      component: register,
      meta: {
        skipIfAuthorized: true,
        isOpen: true,
      },
    },
    {
      path: '/auth/login',
      component: login,
      meta: {
        skipIfAuthorized: true,
        isOpen: true,
      },
    },
    {
      path: '/auth/logout',
    },
    {
      path: '/account',
      component: account,
    },
    {
      path: '*',
      component: notFound,
      meta: {
        isOpen: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  /*if (store.getters.isAuthenticated) {
    if (to.path === '/auth/logout') {
      store.dispatch('logout')
    } else if (to.matched.some(record => record.meta.skipIfAuthorized)) {
      next({
        path: '/home',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.isOpen)) {*/
    next()
  /*} else {
    next({
      path: '/auth/login',
      query: {
        redirect: to.fullPath,
      },
    })
  }*/
}) 

export default router
