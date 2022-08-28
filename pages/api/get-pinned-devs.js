const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')
myHeaders.append('Authorization', 'Basic UGFydmVlbjoxMjM0')

export default async function handler(req, res) {
  const ids = req.body
  console.log(ids);
  let raw = JSON.stringify({
    operation: 'search_by_hash',
    schema: 'hackathon',
    table: 'developers',
    hash_values: [...ids],
    get_attributes: ['*'],
  })
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }
  let response = await fetch(
    'https://managerapp-praveen.harperdbcloud.com',
    requestOptions
  )
  response = await response.json()
  res.status(200).json({ data: response })
}
