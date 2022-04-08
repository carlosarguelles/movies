<script lang="ts" setup>
import { useFetch } from '../utils/fetch'
import Card from '../components/Card.vue'
import { PopularMovies } from '../types/PopularMovies'

const { data, error } = useFetch<PopularMovies>('/movie/popular')
</script>

<template>
  <h1>movies</h1>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="data">
    <div v-for="movie in data.results">
      <Card :movie="movie" />
    </div>
  </div>
  <div v-else>Loading...</div>
</template>
