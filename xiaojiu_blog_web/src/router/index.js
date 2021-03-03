import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/layout'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/article',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home')
      },
      {
        path: 'article',
        name: 'Article',
        component: () => import('../views/Article')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/About')
      },
      {
        path: 'archives',
        name: 'Archives',
        component: () => import('../views/Archives')
      },
      {
        path: 'project',
        name: 'Project',
        component: () => import('../views/Project')
      }
    ]
  },
  {
    path: '/article-detail/:id',
    name: 'Detail',
    component: () => import('../views/Article/Detail')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/test.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history', // require service support
  routes
})

export default router
