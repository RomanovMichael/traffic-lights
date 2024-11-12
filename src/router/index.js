import { createRouter, createWebHistory } from 'vue-router'

const MAIN_TITLE = 'Traffic Lights'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'all',
      path: '/:pathMatch(.*)*',
      redirect: '/app'
    },
    {
      path: '/app',
      name: 'app',
      redirect: '/app/home',
      component: () => import('@/views/app/app-page.vue'),
      children: [
        {
          path: '/app/home',
          name: 'home',
          meta: {
            title: 'Home page',
            keepAlive: true
          },
          component: () => import('@/views/app/home/home-page.vue')
        },
        {
          path: '/app/objects',
          name: 'list',
          meta: {
            title: 'List page'
          },
          component: () => import('@/views/app/objects/objects-page.vue')
        },
        {
          path: '/app/statistic',
          name: 'statistic',
          meta: {
            title: 'Statistic page'
          },
          component: () => import('@/views/app/statistic/statistic-page.vue')
        }
      ]
    }
  ]
})

router.afterEach((to, from) => {
  document.title = `${MAIN_TITLE} ${
    to.meta?.title
      ? `| ${to.meta.title}`
      : to.meta?.subtitle
        ? `| ${to.meta?.subtitle}`
        : ''
  }`
})

export default router
