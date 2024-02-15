import {
  UPDATE_DATA,
  LOADING_DATA,
  LOADING_POKEMON_LIST,
  POKEMON_LIST,
  FAILED_DATA
} from '../constants'

const InitialData = {
  data: [{ results: [] }],
  loading: false,
  success: false,
  pokemonList: [],
  loadingPokemonList: false,
  successPokemonList: false,
  fail: false
}

const DataReducer = (state = InitialData, payload) => {
  switch (payload.type) {
    case UPDATE_DATA:
      return {
        ...state,
        data: payload.payload,
        loading: false,
        success: true
      }
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
        success: false
      }
    case POKEMON_LIST:
      return {
        ...state,
        pokemonList: payload.payload,
        loadingPokemonList: false,
        successPokemonList: true
      }
    case LOADING_POKEMON_LIST:
      return {
        ...state,
        loadingPokemonList: true,
        successPokemonList: false
      }
    case FAILED_DATA:
      return {
        ...state,
        loadingPokemonList: false,
        fail: true
      }
    default:
      return {
        ...state
      }
  }
}
export default DataReducer
