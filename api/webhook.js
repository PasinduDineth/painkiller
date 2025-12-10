// In-memory storage for webhook logs (resets on cold start)
let logs = []
const MAX_LOGS = 100

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // POST: Receive webhook from Rollbar
  if (req.method === 'POST') {
    const payload = req.body
    const logEntry = {
      timestamp: new Date().toISOString(),
      data: payload,
    }
    
    console.log('Rollbar webhook received:', payload)
    
    logs.unshift(logEntry)
    if (logs.length > MAX_LOGS) {
      logs = logs.slice(0, MAX_LOGS)
    }
    
    return res.status(200).json({ success: true, message: 'Webhook received' })
  }

  // GET: Fetch latest logs for the React app
  if (req.method === 'GET') {
    return res.status(200).json(logs)
  }

  res.status(405).json({ error: 'Method not allowed' })
}
