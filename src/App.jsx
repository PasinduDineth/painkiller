import { useEffect, useState } from 'react'
import './App.css'

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || ''
const POLL_INTERVAL = 5000 // Poll every 5 seconds

function App() {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    if (!WEBHOOK_URL) {
      console.error('VITE_WEBHOOK_URL is not configured')
      return
    }

    const fetchLogs = async () => {
      try {
        const response = await fetch(WEBHOOK_URL)
        if (response.ok) {
          const data = await response.json()
          if (Array.isArray(data) && data.length > 0) {
            console.log('Rollbar logs fetched:', data)
            setLogs(data)
          }
        }
      } catch (error) {
        console.error('Failed to fetch logs:', error)
      }
    }

    fetchLogs()
    const interval = setInterval(fetchLogs, POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="app">
      <header className="hero">
        <h1>Painkiller Rollbar Logs</h1>
        <p>Listening to {WEBHOOK_URL || 'No webhook URL configured'}</p>
      </header>

      <section className="panel">
        <h2>Recent Logs ({logs.length})</h2>
        {logs.length === 0 ? (
          <p className="placeholder">Waiting for Rollbar logs...</p>
        ) : (
          <div className="logs">
            {logs.map((log, index) => (
              <div key={index} className="log-entry">
                <div className="log-time">{new Date(log.timestamp).toLocaleString()}</div>
                <pre className="payload">{JSON.stringify(log.data, null, 2)}</pre>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App
