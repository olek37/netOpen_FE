import request from './request'

const signUp = async (data) => {
  const response = await request('signUp', data)

  if(!response.ok) throw new Error('Sign up failed. This email may be taken.')

  return response.text()
}

const signIn = async (data, setAuth) => {
  const response = await request('signIn', data)

  if(!response.ok) throw new Error('Sign in failed. Did you use the right password?')

  // in other cases we return text without awaiting the transformation, because the caller will await it
  const token = await response.text()
  
  localStorage.setItem('TOKEN', token)
  setAuth(true)

  return 'You\'re in!'
}

const confirmAccount = async (data) => {
  const response = await request('confirmAccount', data)

  if(!response.ok) throw new Error('Confirmation failed. Please contact our support team.')

  return response.text()
}

const forgotPassword = async (data) => {
  const response = await request('forgotPassword', data)

  if(!response.ok) throw new Error('Password renewal process failed. Please contact our support team.')

  return response.text()
}

const changePassword = async (data, setAuth) => {
  const response = await request('changePassword', data)

  if(!response.ok) throw new Error('Password renewal process failed. Please contact our support team.')
  
  const token = await response.text()
  
  localStorage.setItem('TOKEN', token)
  setAuth(true)

  return 'You\'re in!'
}

export { signUp, confirmAccount, signIn, forgotPassword, changePassword }