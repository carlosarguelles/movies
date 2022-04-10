import { RouteRecordRaw } from 'vue-router'
import Index from './pages/index.vue'
import Movie from './pages/movie.vue'

// All routes
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
