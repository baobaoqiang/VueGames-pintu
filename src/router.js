import Vue from 'vue'
import Router from 'vue-router'
import JigsawPuzzle from './views/JigsawPuzzle.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'jigsawPuzzle',
      component: JigsawPuzzle
    },
    {
      path: '/minesweeper',
      name: 'minesweeper',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Minesweeper.vue')
    }
  ]
})
