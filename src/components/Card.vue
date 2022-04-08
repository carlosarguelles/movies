<script setup lang="ts">
import { Movie } from '../types/Movie'

const { movie } = defineProps<{ movie: Movie }>()
</script>

<template>
  <article>
    <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" />
    <h2>{{ movie.title }}</h2>
  </article>
</template>

<style scoped>
h2 {
  color: white;
}
</style>
