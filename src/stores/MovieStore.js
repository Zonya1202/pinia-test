// import { defineStore } from 'pinia'

// // создание стора
// export const useMovieStore = defineStore('movieStore', {
//   // стейты стора
//   state: () => ({
//     movies: [],
//     activeTab: 2
//   }),
//   // геттерсы нужны для филтрации или обработки стейта
//   getters: {
//     watchedMovies() {
//       return this.movies.filter((el) => el.isWatched)
//     },
//     totalCountMovies() {
//       return this.movies.length
//     }
//   },
//   // акшионс команды(дейсвия)
//   actions: {
//     setActiveTab(id) {
//       this.activeTab = id
//     },
//     toggleWatched(id) {
//       const idx = this.movies.findIndex((el) => el.id === id)
//       this.movies[idx].isWatched = !this.movies[idx].isWatched
//     },
//     deleteMovie(id) {
//       this.movies = this.movies.filter((el) => el.id !== id)
//     }
//   }
// })

import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useMovieStore = defineStore('movieStore', () => {
  const movies = ref([
    {
      id: 1,
      original_title: 'Spider-Man',
      overview:
        'After being bitten by a genetically altered spider at Oscorp, nerdy but endearing high school student Peter Parker is endowed with amazing powers to become the superhero known as Spider-Man.',
      poster_path: '/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg',
      release_date: '2002-05-01',
      isWatched: false
    },
    {
      id: 2,
      original_title: 'The Batman',
      overview:
        'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.',
      poster_path: '/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',
      release_date: '2022-03-01',
      isWatched: false
    }
  ])
  const activeTab = ref(1)

  // сохранение данных в local storage
  const moviesInLocalSotrage = localStorage.getItem('movies')
  if (moviesInLocalSotrage) {
    movies.value = JSON.parse(moviesInLocalSotrage)._value
  }
  const watchedMovies = computed(() => movies.value.filter((el) => el.isWatched))

  const totalCountMovies = computed(() => movies.value.length)

  const setActiveTab = (id) => {
    activeTab.value = id
  }

  const toggleWatched = (id) => {
    const idx = movies.value.findIndex((el) => el.id === id)
    movies.value[idx].isWatched = !movies.value[idx].isWatched
  }

  const deleteMovie = (id) => {
    movies.value = movies.value.filter((el) => el.id !== id)
  }

  // функция следящаяя за объектом movies и если он изменится, в local storage поступят новые данные
  watch(
    () => movies,
    (state) => {
      localStorage.setItem('movies', JSON.stringify(state))
    },
    { deep: true }
  )

  // при использовании composition Api обязательно возвращать все state, actions и getters
  return {
    movies,
    activeTab,
    watchedMovies,
    totalCountMovies,
    setActiveTab,
    toggleWatched,
    deleteMovie
  }
})
