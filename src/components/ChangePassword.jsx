import React from 'react'
import { useHistory } from 'react-router-dom'
import { changePassword } from '../api/user'

import { useForm } from '../CustomHooks'

const ChangePassword = ({ params, setAuth }) => {
  let history = useHistory()
  const { inputs, handleInputChange } = useForm()
  
  const toHome = () => {
    history.push('/');
  }
  const submitForm = async (e) => {
    e.preventDefault()
    try {
      const { token } = params.match.params
      const response = await changePassword({ value: token, password: inputs.password }, setAuth)
      alert(response)
      toHome()

    } catch(e) {
      alert(e)
      
    }
  }

  return (
    <div className='container card confirm'>
      <h1 className='title'>New password</h1>
      <form noValidate autoComplete="off" onSubmit={ submitForm }>
        <div className='input-group'>
          <div className='input-wrapper'>
            <label htmlFor='password'>New password:</label>
            <input
              className='input'
              name='password' 
              type='password' 
              value={ inputs.password || '' }
              onChange={handleInputChange} 
              required
            />
          </div>
        </div>
        <div className='button-wrapper'>
          <button className='button' type='submit'>Confirm</button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword