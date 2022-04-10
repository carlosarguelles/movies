<script setup lang="ts">
import { Movie } from '../types/Movie'

// Define component props
const { movie } = defineProps<{ movie: Movie }>()
</script>

<template>
  <article>
    <!-- Show movie poster -->
    <img :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`" />
    <!-- Show movie name -->
    <a :href="`/movie/${movie.id}`">{{ movie.title }}</a>
  </article>
</template>

<style scoped>
article {
  padding: 10px;
  text-align: center;
}
</style>
