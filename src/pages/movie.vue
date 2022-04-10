<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from '../utils/useFetch'
import { DetailedMovie } from '../types/DetailedMovie'
import { Credits } from '../types/Credits'
import { computed } from '@vue/reactivity'
import Imdb from '../components/Imdb.vue'
import Cast from '../components/Cast.vue'

// Composable access to router.
const router = useRouter()
const route = useRoute()

// Take the movie id from an URL.
let movieId = route.params.id

// Fetch the movie data.
const { data: movie, error } = useFetch<DetailedMovie>(`/movie/${movieId}`)

// Fetch the cast data.
const { data: credits, error: _ } = useFetch<Credits>(`/movie/${movieId}/credits`)

// Computed property that returns a string with the movie genres.
const genres = computed(() => {
  return movie?.value?.genres?.map(genre => genre.name).join(', ')
})

// Computed property that returns an array of Cast.
const mainCast = computed(() => {
  return credits.value?.cast?.slice(0, 5)
})
</script>

<template>
  <a @click="router.back()">Go back</a>
  <!-- Check if an error occurred -->
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="movie" id="movie">
    <!-- Show the poster of the movie -->
    <img id="poster" :src="`https://image.tmdb.org/t/p/w400/${movie.poster_path}`" />
    <!-- Show the movie information -->
    <div>
      <h1>{{ movie.title }}</h1>
      <p>Overview: {{ movie.overview }}</p>
      <p>Genres: {{ genres }}</p>
      <p>Release date: {{ movie?.release_date }}</p>
      <a :href="`https://www.imdb.com/title/${movie.imdb_id}`" target="_blank">
        <Imdb style="width: 50px;"></Imdb>
      </a>
      <!-- Show main cast -->
      <div v-if="credits">
        <div style="margin-bottom: 20px;">Main cast:</div>
        <div id="cast">
          <Cast :cast="cast" v-for="cast in mainCast" />
        </div>
      </div>
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
  align-items: flex-start;
}

#poster {
  width: 100%;
  height: auto;
}

@media (max-width: 580px) {
  #movie {
    display: block;
  }
}

#cast {
  display: flex;
  gap: 15px;
  flex-wrap: nowrap;
  overflow-x: auto;
}

p {
  line-height: 1.5em;
}
</style>
