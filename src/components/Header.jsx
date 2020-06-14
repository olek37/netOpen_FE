import React from 'react'
import { useHistory, Link } from 'react-router-dom'

const Header = ({ auth, setAuth }) => {
  let history = useHistory()

  const toHome = () => {
    history.push('/')
  }
  
  const signOut = () => {    
    localStorage.clear()
    setAuth(false)
    history.push('/signIn')
  }

  
  return (
  <div className='header'>
    <div className='container'>
      <h3 className='logo' onClick={toHome}>
        netOpen
      </h3>
      <div className='items'>
        <Link to='/'>All tournaments</Link>
        { auth && <Link to='/new'>Create tournament</Link> }
      </div>
        {
         auth ? (
          <div className='icons'>
            <Link to="/myOpen">myOpen</Link>
            <Link to='/' onClick={signOut}>Sign out</Link>
          </div> 
          ) : (
          <div className='icons'>
            <Link to='/signIn'>Sign in</Link>
            <Link to='/signUp'>Sign up</Link>
          </div> 
          )
        }
    </div>
  </div>
  )
};


export default Header;