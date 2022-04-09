<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from '../utils/useFetch'
import { DetailedMovie } from '../types/DetailedMovie'
import { computed } from '@vue/reactivity';
import { watchEffect } from 'vue';
import Imdb from '../components/Imdb.vue'

const router = useRouter()
const route = useRoute()

let movieId = route.params.id

const { data: movie, error } = useFetch<DetailedMovie>(`/movie/${movieId}`)

watchEffect(
  () => console.log(movie.value)
)

const genres = computed(() => {
  return movie.value.genres.map(genre => genre.name).join(', ')
})
</script>

<template>
  <a @click="router.back()">Go back</a>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="movie" id="movie">
    <img :src="`https://image.tmdb.org/t/p/w400/${movie.poster_path}`" />
    <div>
      <h1>{{ movie.title }}</h1>
      <p>Overview: {{ movie.overview }}</p>
      <p>Genres: {{ genres }}</p>
      <p>Release date: {{ movie.release_date.toString() }}</p>
      <a :href="`https://www.imdb.com/title/${movie.imdb_id}`" target="_blank">
        <Imdb style="width: 50px;"></Imdb>
      </a>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<style scoped>
a {
  text-transform: none;
}

h1 {
  display: inline;
  margin: 0;
  font-size: 50px;
}

#movie {
  display: flex;
  gap: 30px;
}

p {
  line-height: 1.5em;
}
</style>
