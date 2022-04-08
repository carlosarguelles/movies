<script setup lang="ts">
import { Movie } from '../types/Movie'

const { movie } = defineProps<{ movie: Movie }>()
</script>

<template>
  <article>
    <img :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`" />
    <h2>{{ movie.title }}</h2>
  </article>
</template>

<style scoped>
h2 {
  color: white;
  text-transform: uppercase;
}

h2:hover {
  text-decoration: underline;
  cursor: pointer;
}

article {
  padding: 10px;
  text-align: center;
}

img {
  border-radius: 10px;
}
</style>
