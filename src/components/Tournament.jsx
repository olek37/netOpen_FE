import React, { useState } from 'react'
import Sketch from 'react-p5'
import { setup, draw } from '../Graph'

import Loading from './Loading'
import { useAsync } from 'react-async'
import { useForm } from '../CustomHooks'
import { useHistory, Link } from 'react-router-dom'
import { getTournament, joinTournament } from '../api/tournament'

const loadData = async ({ data }) => await getTournament(data)

const Tournament = ({ auth, params: { match: { params: id }} }) => {
  const [ modal, setModal ] = useState(false)
  const { inputs, handleInputChange } = useForm()
  let history = useHistory()

  const toSignIn = () => {
    history.push('/signIn')
  }

  const { data, isPending, reload } = useAsync({ 
    promiseFn: loadData, 
    data: id
  })

  if(isPending) return <Loading />
  
  const { tournament, users, games, joined } = data

  const player_size = 80
  const size = (users.length * player_size)/Math.PI * 3 + player_size

  const graphData = {
    size: player_size,
    players: users,
    games: games.filter(game => game.result != null).map(game => [
      users.find(user => game.result === user._id),
      users.find(user => game.result === game.players[0] ? user._id === game.players[1] : user._id === game.players[0])
    ])
  }

  const submitForm = async () => {
    try {
      const response = await joinTournament({ tournament_id: tournament._id })
      alert(response)
      setModal(false)
      reload()
      
    } catch(e) {
      alert(e)

    }
  }

  const handleClick = async () => {
    if(!auth) toSignIn()
    setModal(true)
  }

  if(modal) return (
  <div className='signup container'>
    <div className='card'>
      <h1 className='title'>{tournament.name}</h1>
      <form noValidate autoComplete="off" onSubmit={ submitForm }>
        <div className='input-group'>
          <div className='input-wrapper'>
            <label htmlFor='license'>License:</label>
            <input
            name='license' 
            type='text' 
            value={ inputs.license || '' }
            onChange={ handleInputChange } 
            required
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='rank'>Ranking:</label>
            <input
            className='input'
            name='rank' 
            type='number' 
            value={ inputs.rank || '' }
            onChange={ handleInputChange } 
            required
            />
          </div>
        </div>
        <div className='button-wrapper'>
          <button className='button' type='submit'>Join</button>
        </div>
      </form>
    </div>
  </div>
  )
  
  return (
    <div className='wrapper'>

      <div className='tournament container'>
        <h1>{ tournament.name }</h1>
        <div className='box'>
          <p className='max_participants'>Players:
            <span>{users.length} / {tournament.max_participants}</span>
          </p>
          <p className='location'>Location:
            <span>{ tournament.location }</span>
          </p>
          <p className='deadline'>Deadline:
            <span>{ tournament.deadline.slice(0,10) }</span>
          </p>
          { !joined && new Date(tournament.deadline) >= new Date() && <button className='join' onClick={handleClick}>Join</button> }
        </div>
        <Sketch className='canvas' setup={setup(size)} draw={draw(graphData)} />
        <Link className='link-back' to='/'>&#10229; Back to Tournaments</Link>
      </div>
      <div className='sponsors'>
        <img alt='atp-logo' src='https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/ATP_Tour_logo.svg/1200px-ATP_Tour_logo.svg.png'></img>
        <img alt='wilson-logo' src='https://seeklogo.com/images/W/Wilson-logo-78165D17DC-seeklogo.com.png'></img>
        <img alt='rr-logo' src='https://pngimg.com/uploads/rolls_royce/rolls_royce_PNG27.png'></img>
        <img alt='head-logo' src='https://seeklogo.com/images/H/head-ski-logo-4AFFA398A9-seeklogo.com.png'></img>
      </div>
      <iframe 
        title='graph'
        width="100%" 
        height="300" 
        id="gmap_canvas" 
        src={`https://maps.google.com/maps?q=${tournament.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`} 
        frameBorder="0" 
        scrolling="no" 
        marginHeight="0" 
        marginWidth="0">
      </iframe>
      </div>
  )

}

export default Tournament