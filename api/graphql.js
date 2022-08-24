const serverSideFetch = async (query) => {
  const response = await fetch(process.env.GRAFBASE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.GRAFBASE_API_KEY
    },
    body: JSON.stringify(query)
  })
  return await response.json()
}

export default async function handler(req, res) {
  try {
    switch (req?.method?.toUpperCase()) {
      case 'POST':
        return res.status(200).json(await serverSideFetch(req.body))
      default:
        return res.status(405).json({ status: 405 })
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: JSON.stringify(error)
    })
  }
}
