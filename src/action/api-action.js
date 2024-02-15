import {
  UPDATE_DATA,
  LOADING_DATA,
  POKEMON_LIST,
  LOADING_POKEMON_LIST,
  FAILED_DATA
} from '../constants'

export function CategoryListAction (page, limit = 10, search = {}) {
  let finalUrl = 'https://pokeapi.co/api/v2/pokemon'

  if (!search.name && !search.type) {
    finalUrl += `?offset=${page}&limit=${limit}`
  } else if (search.name) {
    const lowercasename = search?.name?.toLowerCase()
    finalUrl += `/${lowercasename}`
  }

  return async (dispatch) => {
    try {
      dispatch(loadingData())

      const response = await fetch(finalUrl)
      const data = await response.json()

      let finalData = []

      if (!search.name) {
        const result = data.results
        for (let i = 0; i < data.results.length; i++) {
          const response1 = await fetch(data.results[i].url)
          const data1 = await response1.json()
          result[i] = {
            ...result[i],
            src: data1?.sprites?.other?.dream_world?.front_default,
            types: data1?.types
          }
        }
        finalData = { ...data, results: result }
      } else {
        finalData = {
          results: [
            {
              count: 1,
              name: data.name,
              types: data?.types,
              src: data?.sprites?.other?.dream_world?.front_default
            }
          ]
        }
      }

      dispatch(updateData(finalData))
    } catch (err) {
      dispatch(failedData())
      console.log(err.message)
    }
  }
}
export function updateData (payload) {
  return { type: UPDATE_DATA, payload }
}

export function loadingData () {
  return { type: LOADING_DATA }
}

export function failedData () {
  return { type: FAILED_DATA }
}

export function ListAction (api = '') {
  return async (dispatch) => {
    try {
      dispatch(loadingUpdateListData())
      const response = await fetch(api)
      const data = await response.json()
      dispatch(updateListData(data))
    } catch (err) {
      dispatch(failedData())
      console.log(err.message)
    }
  }
}
export function updateListData (payload) {
  return { type: POKEMON_LIST, payload }
}

export function loadingUpdateListData () {
  return { type: LOADING_POKEMON_LIST }
}
