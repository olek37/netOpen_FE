import request from './request'

const createTournament = async (data) => {
  const token = localStorage.getItem('TOKEN')

  const response = await request('tournaments/new', data, token)

  if(!response.ok) throw new Error('Creating tournament failed.')

  return response.json()
}

const getTournaments = async (data) => {

  const response = await request('tournaments', data)

  if(!response.ok) alert('Fetching tournaments failed.')

  return response.json()
}

const getTournament = async (data) => {
  const token = localStorage.getItem('TOKEN')
  
  const response = await request('tournament', data, token)

  if(!response.ok) alert('Fetching tournament failed.')

  return response.json()
}

const joinTournament = async (data) => {
  const token = localStorage.getItem('TOKEN')
  
  const response = await request('joinTournament', data, token)

  if(!response.ok) alert('Joining tournament failed.')

  return response.text()
}

const usersTournaments = async () => {
  const token = localStorage.getItem('TOKEN')

  const response = await request('myOpen', {}, token)

  if(!response.ok) alert('Fetching user\'s data failed.')

  return response.json()
}

const updateWinner = async (data) => {
  const token = localStorage.getItem('TOKEN')

  const response = await request('updateWinner', data, token)

  if(!response.ok) alert('Updating the winner failed.')

  return response.text()
}

export { createTournament, getTournament, getTournaments, joinTournament, usersTournaments, updateWinner }