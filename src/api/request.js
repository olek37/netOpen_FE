import { PORT } from '../constants'

const request = async (route, data, token) => {

  const response = await fetch(`http://localhost:${PORT}/${route}`, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    redirect: 'follow',
    body: JSON.stringify(data)
  })

  return response

}

export default request