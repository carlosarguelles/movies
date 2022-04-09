<script lang="ts" setup>
import { useFetch } from '../utils/useFetch'
import Card from '../components/Card.vue'
import { PopularMovies } from '../types/PopularMovies'
import { ref, watchEffect } from 'vue'
import { computed } from '@vue/reactivity'

let params = ref({
  page: 1,
})

const { data, error } = useFetch<PopularMovies>('/movie/popular', params)

const { data: genres } =
  useFetch<{ genres: Array<{ id: number; name: string }> }>('/genre/movie/list')

let filters = ref()

// watchEffect(() => console.log(filters.value))

const filteredMovies = computed(() =>
  filters.value === undefined
    ? data.value?.results
    : data.value?.results.filter(movie =>
      movie.genre_ids.includes(filters.value as number)
    )
)
</script>

<template>
  <h1>Popular movies</h1>
  <div v-if="genres" id="filters">
    <div>Genre:</div>
    <select v-model="filters" placeholder="Genre">
      <option :value="undefined">All</option>
      <option v-for="genre in genres.genres" :value="genre.id">{{ genre.name }}</option>
    </select>
  </div>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="data">
    <div
      id="no-movies"
      v-if="filteredMovies?.length === 0"
    >No movies with this category, try in the next page</div>
    <div id="movies">
      <div v-for="movie in filteredMovies">
        <Card :movie="movie" />
      </div>
    </div>
    <div id="buttons">
      <button @click="params.page--" :disabled="params.page == 1">previous</button>
      <button @click="params.page++">next</button>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<style scoped>
#filters {
  display: flex;
  font-size: 20px;
  gap: 6px;
}

#movies,
#no-movies {
  margin-top: 40px;
  margin-bottom: 40px;
}

#movies {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

#buttons {
  display: flex;
  gap: 5px;
  margin: auto;
  width: 100%;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
