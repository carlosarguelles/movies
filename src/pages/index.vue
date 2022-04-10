<script lang="ts" setup>
import { useFetch } from '../utils/useFetch'
import Card from '../components/Card.vue'
import { PopularMovies } from '../types/PopularMovies'
import { ref } from 'vue'
import { computed } from '@vue/reactivity'

// Reactive object of params. (in this case the number of page requested)
let params = ref({
  page: 1,
})

// Fetch the popular movies data.
const { data, error } = useFetch<PopularMovies>('/movie/popular', params)

// Fetch the genres.
const { data: genres } =
  useFetch<{ genres: Array<{ id: number; name: string }> }>('/genre/movie/list')

// Reactive variable to keep the selected genre .
let filters = ref()

// Computed property that returns an array of Movies.
// If there are any filters, return the filtered movies, otherwise return all
// the movies.
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
    <!-- Select tag for select a genre -->
    <select v-model="filters" placeholder="Genre">
      <option :value="undefined">All</option>
      <option v-for="genre in genres.genres" :value="genre.id">{{ genre.name }}</option>
    </select>
  </div>
  <!-- Check if an error occurred -->
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="data">
    <!-- Check if there are no movies with the selected genre -->
    <div
      id="no-movies"
      v-if="filteredMovies?.length === 0"
    >No movies with this category, try in the next page</div>
    <!-- Show movies -->
    <div id="movies">
      <div v-for="movie in filteredMovies">
        <Card :movie="movie" />
      </div>
    </div>
    <!-- Pagination buttons: Just increment and decrement the number of page (stateful variable) -->
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
  overflow: auto;
}

@media (max-width: 490px) {
  #movies {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (min-width: 500px) {
  #movies {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 850px) {
  #movies {
    grid-template-columns: repeat(3, 1fr);
  }
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
