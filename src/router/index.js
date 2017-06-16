import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Dashboard from '@/components/Dashboard'
import Admin from '@/components/Dashboard_components/Admin'
import Comptes from '@/components/Dashboard_components/Comptes'
import Offres from '@/components/Dashboard_components/Offres'
import Demandes from '@/components/Dashboard_components/Demandes'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/t',
      component: Dashboard,
      children: [{
          path: 'p',
          name: 'Profil',
          component: Admin
        },
        {
          path: 'c',
          name: 'Comptes',
          component: Comptes
        },
        {
          path: 'o',
          name: 'Offres',
          component: Offres
        },
        {
          path: 'd',
          name: 'Demandes',
          component: Demandes
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
