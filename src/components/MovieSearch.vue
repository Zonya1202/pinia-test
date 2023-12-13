<script setup>
import LoaderSearch from '../components/LoaderSearch.vue'
import MovieList from '../components/MovieList.vue'
import { ref } from 'vue'
import { useSearchStore } from '../stores/SearchStore'

const searchStore = useSearchStore()
const searchMovie = ref('')
</script>

<template>
  <form @submit.prevent="searchStore.getMovies(searchMovie)">
    <input type="text" class="search-input" placeholder="Input movie" v-model="searchMovie" />
  </form>
  <!-- показ лоадера если началась заргузка -->
  <LoaderSearch v-if="searchStore.loader" />
  <!-- показ компонента если загрузка завершилась -->
  <div v-else>
    <MovieList
      v-for="movie of searchStore.movies"
      :key="movie.id"
      :movie="movie"
      :is-search="true"
    />
  </div>
</template>

<style scoped>
.search-input {
  border: 1px solid #e7e7e7;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>
