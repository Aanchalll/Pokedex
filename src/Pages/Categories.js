import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CategoryListAction } from '../action/api-action'
import Loader from '../components/loader'
import { useNavigate } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import { RESULT_PER_PAGE_ARRAY } from '../constants'

const Categories = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [resultPerPage, setResultPerPage] = useState(10)
  const [search, setSearch] = useState({ name: '' })
  const searchData = useRef({ name: '' })

  const pokemonReducer = useSelector((state) => {
    return state.dataReducer
  })
  const PokemonData = pokemonReducer?.data?.results
  const isLoading = pokemonReducer.loading
  const isFailure = pokemonReducer.fail
  const navigate = useNavigate()
  const count = pokemonReducer?.data?.count

  useEffect(() => {
    dispatch(CategoryListAction(page, resultPerPage, search))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, resultPerPage])

  function Redirection (url, key) {
    navigate(`/${key}`, { state: { url } })
  }

  function handlePageChange (pageNumber) {
    setPage(pageNumber)
  }

  function handleNameSearch (name) {
    if (searchData?.current?.name && searchData?.current?.name?.length > 0) {
      setSearch({ name: searchData.current.name })
    } else {
      alert('Empty search input!')
      setSearch({ name: '' })
    }
  }

  return (
    <div>
      <div className='search-div'>
        <input
          type='text'
          id='lname'
          name='lname'
          placeholder='search name'
          className='search-input'
          onChange={(e) => {
            searchData.current.name = e?.target?.value
            if (e?.target?.value === '') {
              setSearch({ name: '' })
            }
          }}
        />
        <button className='search-button' onClick={handleNameSearch}>
          Search
        </button>

        {/* dropdown */}
        <select
          value={resultPerPage}
          onChange={(e) => { setResultPerPage(e.target.value) }}
          className='dropdown'
        >
          {RESULT_PER_PAGE_ARRAY.map((value) => {
            return (
              <option key={value + 'dropdown'} value={value}>
                {value}
              </option>
            )
          })}
        </select>
      </div>

      {!isLoading && !isFailure
        ? (
          <>
            <div className='pokemon-card-container'>
              {PokemonData &&
              PokemonData?.length > 0 &&
              PokemonData?.map((data, index) => {
                const { name, url, src, types } = data
                return (
                  <div className='pokemon-card' key={index}>
                    <span className='card-name'>{name}</span>
                    <div className='type-tags-div'>
                      {types &&
                        types?.length &&
                        types?.map((value, index) => {
                          const { type } = value
                          return (
                            <span
                              key={index + name + 'type'}
                              className='type-tag'
                            >
                              {type?.name}
                            </span>
                          )
                        })}
                    </div>

                    <button
                      onClick={() => {
                        Redirection(url, index + 1)
                      }}
                      className='get-details-button'
                    >
                      More Details
                    </button>

                    <div className='pokemon-card-img'>
                      <img src={src} alt={name} />
                    </div>
                  </div>
                )
              })}
            </div>

            {PokemonData?.length > 3 && (
              <div className='pagination'>
                <Pagination
                  activePage={page}
                  itemsCountPerPage={resultPerPage ? Number(resultPerPage) : 5}
                  totalItemsCount={count || 0}
                  pageRangeDisplayed={3}
                  onChange={(pageNumber) => handlePageChange(pageNumber)}
                />
              </div>
            )}
          </>
          )
        : !isFailure
            ? (
              <Loader />
              )
            : (
              <span>No Data Found!</span>
              )}
    </div>
  )
}

export default Categories
