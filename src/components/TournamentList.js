import React, { useState, useRef, useEffect } from 'react'
import { useForm, useAsync } from '../CustomHooks'
import { Link } from 'react-router-dom'
import { getTournaments } from '../api/tournament'

import Loading from './Loading'


const loadData = (data) => async () => await getTournaments(data)

const TournamentList = () => {
  const [page, setPage] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { inputs, handleInputChange } = useForm()

  const searchQuery = inputs.search && inputs.search.length > 2 ? inputs.search : ''
  
  const { execute, pending, value: data } = useAsync(loadData({ offset: page*10, count: 10, search: searchQuery }), false)
  
  const search = useRef(null)
  
  useEffect(() => {
    if(search.current) {
      search.current.focus()
    }
  })

  if(!mounted) {
    execute()
    setMounted(true)
  }

  const handleSearchChange = (e) => {
    handleInputChange(e)
    setPage(0)
    setMounted(false)
  }

  const handlePageClick = (newPage) => () => {
    setPage(newPage)
    setMounted(false)
  }

  if(pending) return <Loading />

  if(data) return (
    <div className='tournament-list list container'>
      <div className='list-header'>
        <p>Name</p>
        <p>Max participants</p>
        <p>Location</p>
        <p>Deadline</p>
        <div class='search-wrapper'>
          <input
            className='search'
            placeholder='Search...'
            name='search' 
            ref={search}
            type='text' 
            value={ inputs.search || '' }
            onChange={ handleSearchChange }       
          />
        </div>
      </div>
      { 
        data.tournaments.map(tournament => (
          <div key={ tournament._id } className='list-item'>
            <p>{ tournament.name }</p>
            <p>{ tournament.max_participants }</p>
            <p>{ tournament.location }</p>
            <p>{ tournament.deadline.slice(0,10) }</p>
            <Link to={ `/${tournament._id}` }><span>View</span></Link> 
          </div>
        ))
      }
      <div className='pagination'>
      {
        [...Array(Math.ceil(data.count/10))].map((_, idx) => (
          <div 
            onClick={ handlePageClick(idx) } 
            key={idx} 
            className={ page===idx ? 'active' : ''}>
            <span>{idx+1}</span>
          </div>
        ))
      }
      </div>
    </div>
  )
  return null
}

export default TournamentList