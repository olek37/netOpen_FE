import React from 'react'
import { useHistory } from 'react-router-dom'

import { confirmAccount } from '../api/user'

const Confirm = ({ params }) => {
  let history = useHistory()
  
  const toSignIn = () => {
    history.push('/signIn');
  }

  const buttonClick = async () => {
    const { token } = params.match.params

    try {
      const response = await confirmAccount({ value: token })
      alert(response)
      toSignIn()  

    } catch(e) {
      alert(e)
      
    }
  }

  return (
    <div className='container card confirm'>
      <h3 className='title'>Confirm your account</h3>
      <button className='button' onClick={ buttonClick }>Confirm</button>
    </div>
  )
}

export default Confirm