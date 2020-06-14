import request from 'request'

const joinTournament = async (id) => {
  const token = localStorage.getItem('TOKEN')

  const response = await request('joinTournament', { tournament_id: id }, token)

  if(!response.ok) throw new Error('Could not join tournament.')

  return response.text()
}

export { joinTournament }