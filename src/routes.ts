import { RouteRecordRaw } from 'vue-router'
import Index from './pages/index.vue'
import Movie from './pages/movie.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/movie/:id',
    component: Movie,
  },
]
