const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')
myHeaders.append('Authorization', 'Basic UGFydmVlbjoxMjM0')

export default async function handler(req, res) {
  const conditions = []
  const skills = req.query.skills
  const experience = req.query.experience
  const location = req.query.location
  if (skills !== 'all' && skills !== '') {
    conditions.push({
      search_attribute: 'skills',
      search_type: 'contains',
      search_value: skills,
    })
  }
  if (location !== 'all' && location !== '') {
    conditions.push({
      search_attribute: 'location',
      search_type: 'equals',
      search_value: location,
    })
  }
  if (experience !== 'all' && experience !== '') {
    conditions.push({
      search_attribute: 'experience',
      search_type: 'equals',
      search_value: experience,
    })
  }
  let raw
  let requestOptions
  if (conditions.length > 0) {
    raw = JSON.stringify({
      operation: 'search_by_conditions',
      schema: 'hackathon',
      table: 'developers',
      operator: 'and',
      get_attributes: ['*'],
      conditions: [...conditions],
    })

    requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }
  } else {
    raw = JSON.stringify({
      operation: 'sql',
      sql: 'SELECT * FROM hackathon.developers',
    })

    requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }
  }
  let response = await fetch('https://managerapp-praveen.harperdbcloud.com', requestOptions)
  response = await response.json()
  res.status(200).json({ data: response })
}
