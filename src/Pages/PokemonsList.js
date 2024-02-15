import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ListAction } from '../action/api-action'
import Loader from '../components/loader'
import { useLocation, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

const PokemonsList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const pokemonReducer = useSelector((state) => {
    return state.dataReducer
  })
  const listData = pokemonReducer.pokemonList
  const isLoading = pokemonReducer.loadingPokemonList
  const params = useLocation()
  const CategoryUrl = params.state.url

  useEffect(() => {
    if (CategoryUrl) {
      dispatch(ListAction(CategoryUrl))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CategoryUrl])

  return (
    <div>
      {listData && !isLoading
        ? (
          <>
            <button
              onClick={() => {
                navigate(-1)
              }}
              className='rounded '
            >
              Back
            </button>

            <div className='pokemon-details-name mt-5'>
              <h1>Hi! I am {listData?.name}.</h1>

              <h4> Height: {listData.height}</h4>
              <h4> Weight: {listData.weight}</h4>
              <h4> Base Experience: {listData.base_experience}</h4>
              <h4>
                {' '}
                Type:{' '}
                {listData?.types &&
                listData?.types?.map((value, index) => {
                  const { type } = value
                  return (
                    <span
                      key={index + 'type'}
                      className='border p-2 rounded m-1 '
                    >
                      {type.name}
                    </span>
                  )
                })}
              </h4>
            </div>
            <img
              src={listData?.sprites?.other?.dream_world?.front_default}
              className='mt-5'
              alt={listData?.name}
            />
          </>
          )
        : (
          <Loader />
          )}
    </div>
  )
}

export default PokemonsList
