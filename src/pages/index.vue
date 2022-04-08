<script lang="ts" setup>
import { useFetch } from '../utils/fetch'
import Card from '../components/Card.vue'
import { PopularMovies } from '../types/PopularMovies'
import { ref } from 'vue'

let params = ref({
  page: 1,
})

const { data, error } = useFetch<PopularMovies>('/movie/popular', params)
</script>

<template>
  <h1>Trending movies</h1>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="data">
    <div id="movies">
      <div v-for="movie in data.results">
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

<style>
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
