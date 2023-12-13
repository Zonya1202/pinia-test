<script setup>
// подключение стора
import { useMovieStore } from './stores/MovieStore'
import MovieList from './components/MovieList.vue'
import MovieSearch from './components/MovieSearch.vue'

const movieStore = useMovieStore() // перменная в которой лежит стейты, акшионы, и геттерсы
const setTab = (id) => {
  movieStore.setActiveTab(id)
}
</script>

<template>
  <main>
    <header class="header">
      <img src="/logo.svg" alt="logo" class="header-logo" />
      <h2>My Favorite Movies</h2>
    </header>
    <div class="tabs">
      <button :class="['btn', { btn_green: movieStore.activeTab === 1 }]" @click="setTab(1)">
        Favorite
      </button>
      <button :class="['btn', { btn_green: movieStore.activeTab === 2 }]" @click="setTab(2)">
        Search
      </button>
    </div>
    <div class="movies" v-if="movieStore.activeTab === 1">
      <div>
        <!-- отоброжение кол-ва фильмов без геттерса -->
        <h3>Watched movies (count: {{ movieStore.watchedMovies.length }})</h3>
        <!-- перебор отфильтрованного с помощью геттерса массива из стора с передачей каждого объекта в компонент -->
        <MovieList v-for="movie of movieStore.watchedMovies" :key="movie.id" :movie="movie" />
      </div>
      <div>
        <!-- отображение кол-ва фильмов с помощью геттерса -->
        <h3>All movies (count: {{ movieStore.totalCountMovies }})</h3>
        <!-- перебор массива из стора с передачей каждого объекта в компонент -->
        <MovieList v-for="movie of movieStore.movies" :key="movie.id" :movie="movie" />
      </div>
    </div>
    <div class="search" v-else>
      <MovieSearch />
    </div>
  </main>
</template>

<style lang="css">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.header-logo {
  max-width: 50px;
  margin-right: 10px;
}
.btn {
  border: none;
  width: 100px;
  height: 40px;
  font-size: 14px;
  margin: 0 10px;
  border-radius: 10px;
  cursor: pointer;
  background: #efefef;
}
.btn:hover {
  opacity: 0.7;
}
.btn_green {
  background: #37df5c;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>
