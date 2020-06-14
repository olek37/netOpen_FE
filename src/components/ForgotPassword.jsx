import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../CustomHooks'
import { forgotPassword } from '../api/user'

const ForgotPassword = () => {
  const { inputs, handleInputChange } = useForm()
  
  const submitForm = async (e) => {
    e.preventDefault()
    
    try {
      const response = await forgotPassword(inputs)
      alert(response)
      
    } catch(e) {
      alert(e)

    }
  }

  return (
    <div className='signup container'>
      <div className='card'>
        <h1 className='title'>Forgot your password?</h1>
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
          </div>
          <div className='button-wrapper'>
            <button className='button' type='submit'>Yes, I did</button>
          </div>
          <Link to='/signIn'>Sign in</Link>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword