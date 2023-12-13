// Options Api

// import { defineStore } from 'pinia'
// import { useMovieStore } from './MovieStore'

// // апи ссылка
// const url =
//   'https:api.themoviedb.org/3/search/movie?api_key=02708c4929ad93aa5e68f8ee7bfa4445&query='

// export const useSearchStore = defineStore('searchStore', {
//   state: () => ({
//     loader: false, // тригер лоадера
//     movies: [] // массив фильмов
//   }),
//   actions: {
//     // запрос к апи на получение фильмов по навзанию
//     async getMovies(search) {
//       this.loader = true
//       const res = await fetch(`${url}${search}`)
//       const data = await res.json()
//       this.movies = data.results
//       this.loader = false
//     },
//     // пушь объекьа из этого стора в movieStore
//     addToUserMovies(obj) {
//       const movieStore = useMovieStore()
//       movieStore.movies.push({ ...obj, isWatched: false })
//       movieStore.activeTab = 1
//     }
//   }
// })

// Composition Api
import { defineStore } from 'pinia'
import { useMovieStore } from './MovieStore'
import { ref } from 'vue'

// апи ссылка
const url =
  'https:api.themoviedb.org/3/search/movie?api_key=02708c4929ad93aa5e68f8ee7bfa4445&query='

export const useSearchStore = defineStore('searchStore', () => {
  const loader = ref(false)
  const movies = ref([])

  const getMovies = async (search) => {
    loader.value = true
    const res = await fetch(`${url}${search}`)
    const data = await res.json()
    movies.value = data.results
    loader.value = false
  }
  const addToUserMovies = (obj) => {
    const movieStore = useMovieStore()
    movieStore.movies.push({ ...obj, isWatched: false })
    movieStore.activeTab = 1
  }

  return {
    loader,
    movies,
    getMovies,
    addToUserMovies
  }
})
