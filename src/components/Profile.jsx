import React, { useState } from 'react'
import { useAsync } from '../CustomHooks'
import { Link } from 'react-router-dom'
import { usersTournaments, updateWinner } from '../api/tournament'

import Loading from './Loading'


const loadData = async () => await usersTournaments()

const Profile = () => {
  const [mounted, setMounted] = useState(false)
  
  const { execute, pending, value: data } = useAsync(loadData, false)

  const handleSelect = (game_id) => async ({ target: { value: winner_id }}) => {
    const data = { game_id, winner_id }
    const response = await updateWinner(data)
    alert(response)

    setMounted(false)
  }

  if(!mounted) {
    execute()
    setMounted(true)
  }

  if(pending) return <Loading/>


  if(data) return (
    <div className='profile'>
      <h1>Welcome {data.my_name}!</h1>
      <div className='container'>
        <div className='tournament-list list'>
          <div className='list-header'>
            <p>Your tournaments</p>
          </div>
          { 
            data.tournaments.map(tournament => (
              <div key={ tournament._id } className='list-item'>
                <p className='first'>{ tournament.name }</p>
                <p className='center'>{ tournament.deadline.slice(0,10) }</p>
                <Link className='right' to={ `/${tournament._id}` }><span>View</span></Link>
              </div>
            ))
          }
        </div>
        <div className='game-list list'>
          <div className='list-header'>
            <p>Your unresolved games</p>
            </div>
            { 
              data.games.map(game => (
                <div key={ game._doc._id } className='list-item'>
                <p>{ game.tournament.name }</p>
                <p className='players'>You vs <span>{ game.players.find(p => p._id !== data.my_id).name }</span></p>
                  <div class='input-group'>
                    <label htmlFor='winner'>Choose winner:</label>
                    <select onChange={ handleSelect(game._doc._id) }>
                    {
                      game.players.map(p => <option selected={ game._doc.last_updated_by === data.my_id && p._id === game._doc.winner } key={p._id} value={p._id}>{ `${p.name} ${p.surname}`}</option>)
                    }
                    {
                      game._doc.last_updated_by !== data.my_id ? <option selected={true} key={-1} value={null}></option> : ''
                    }
                    </select>
                  </div>
                </div>
              ))
            }
        </div>
      </div>
    </div>
  )
  return null
}

export default Profile