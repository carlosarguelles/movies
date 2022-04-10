<script lang="ts" setup>
import { Cast } from '../types/Credits'

const { cast } = defineProps<{ cast: Cast }>()
</script>

<template id="card">
  <div>
    <img
      :src="`https://image.tmdb.org/t/p/w200/${cast.profile_path}`"
      :alt="cast.name"
    />
    <p>{{ cast.name }}</p>
  </div>
</template>

<style scoped>
div {
  text-align: center;
  flex: 1 1 0px;
}

img {
  border-radius: 50%;
  object-fit: cover;
  width: 100px;
  height: 100px;
}
</style>
