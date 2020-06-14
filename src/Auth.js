import React from 'react'

import Error from './components/Error'

const isAuthenticated = () => {
  const token = localStorage.getItem("TOKEN")
  if(token) {
      return true
  }
  return false
}

const noAccess = () => <Error message="You don't have access to this page"/>

export { isAuthenticated, noAccess }