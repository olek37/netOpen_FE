import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from '../CustomHooks'

import { createTournament } from '../api/tournament'

const TournamentForm = () => {
  let history = useHistory()

  const { inputs, handleInputChange } = useForm()

  const toNew = (id) => {
    history.push(`/${id}`)
  }

  const submitForm = async (e) => {
    e.preventDefault()

    try {
      const id = await createTournament(inputs)
      alert('Tournament created')
      toNew(id)
      
    } catch(e) { 
      alert(e)

    }
  }

  return (
    <div className='tournament-form container card'>
      <h1 className='title'>Add tournament</h1>
      <form noValidate autoComplete='off' onSubmit={ submitForm }>
        <div className='input-group'>
          <div className='input-wrapper'>
            <label htmlFor='name'>Name:</label>
            <input
              name='name' 
              type='text' 
              value={ inputs.name || '' }
              onChange={handleInputChange} 
              required
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='max_participants'>Max participants:</label>
            <input
              className='input'
              name='max_participants' 
              type='number' 
              value={ inputs.max_participants || '' }
              onChange={handleInputChange} 
              required
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='location'>Location:</label>
            <input
              name='location'
              type='text'
              value={ inputs.location || '' }
              onChange={handleInputChange} 
              required
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='deadline'>Deadline:</label>
            <input
              name='deadline'
              type='date'
              value={ inputs.deadline || '' }
              onChange={handleInputChange} 
              required
            />
          </div>
        </div>
        <div className='button-wrapper'>
          <button className='button' type='submit'>Add tournament</button>
        </div>
      </form>
    </div>
  )
}

export default TournamentForm