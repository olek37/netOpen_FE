import React from 'react'
import { useHistory, Link } from 'react-router-dom'

import { useForm } from '../CustomHooks'
import { signIn } from '../api/user'

const SignIn = ({ setAuth }) => {
  let history = useHistory()
  const { inputs, handleInputChange } = useForm()
  
  const toHome = () => {
    history.push('/')
  }

  const submitForm = async (e) => {
    e.preventDefault()
    
    try {
      const response = await signIn(inputs, setAuth)
      alert(response)
      toHome()
      
    } catch(e) {
      alert(e)

    }
  }

  return (
    <div className='signup container'>
      <div className='card'>
        <h1 className='title'>Sign in</h1>
        <form noValidate autoComplete="off" onSubmit={ submitForm }>
          <div className='input-group'>
            <div className='input-wrapper'>
              <label htmlFor='email'>Email:</label>
              <input
              name='email' 
              type='email' 
              value={ inputs.email || '' }
              onChange={ handleInputChange } 
              required
              />
            </div>
            <div className='input-wrapper'>
              <label htmlFor='password'>Password:</label>
              <input
              className='input'
              name='password' 
              type='password' 
              value={ inputs.password || '' }
              onChange={ handleInputChange } 
              required
              />
            </div>
          </div>
          <div className='button-wrapper'>
            <button className='button' type='submit'>Sign In</button>
          </div>
          <Link to='/forgotPassword'>Forgot your password?</Link>
        </form>
      </div>
    </div>
  )
}

export default SignIn