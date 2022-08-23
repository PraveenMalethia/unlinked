const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')
myHeaders.append('Authorization', 'Basic UGFydmVlbjoxMjM0')

export default async function handler(req, res) {
  const raw = JSON.stringify({
    operation: 'sql',
    sql: 'SELECT * FROM hackathon.developers',
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  let response = await fetch('https://managerapp-praveen.harperdbcloud.com', requestOptions)
  response = await response.json()
  res.status(200).json({ data: response })
}
