import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../CustomHooks'

import { signUp } from '../api/user'

const SignUp = () => {
  const { inputs, handleInputChange } = useForm()

  const submitForm = async (e) => {
    e.preventDefault()
    try {
      const response = await signUp(inputs)
      alert(response)

    } catch(e) {
      alert(e)
      
    }
  }

  return (
    <div className='signin container'>
      <div className='card'>
        <h1 className='title'>Sign up</h1>
        <form noValidate autoComplete="off" onSubmit={ submitForm }>
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
              <label htmlFor='surname'>Surname:</label>
              <input
                name='surname' 
                type='text' 
                value={ inputs.surname || '' }
                onChange={handleInputChange} 
                required
              />
            </div>
            <div className='input-wrapper'>
              <label htmlFor='email'>Email:</label>
              <input
                name='email' 
                type='email' 
                value={ inputs.email || '' }
                onChange={handleInputChange} 
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
                onChange={handleInputChange} 
                required
              />
            </div>
          </div>
          <div className='button-wrapper'>
            <button className='button' type='submit'>Sign up</button>
          </div>
          <Link to='/signIn'>Already have an account?</Link>
        </form>
      </div>
    </div>
  )
}

export default SignUp