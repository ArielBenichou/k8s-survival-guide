import { serve } from '@hono/node-server'
import { randomUUID } from 'crypto'
import { Hono } from 'hono'

const app = new Hono()
const randomId = randomUUID();

// Endpoint to demonstrate loadbalancing
app.get('/', (c) => {
  return c.json({
    id: randomId,
    name: "Hono.js Server",
    date: new Date().toISOString(),
  })
})

// Endpoint to demonstrate failure
app.get('/fail', (c) => {
  throw new Error('Simulated Failure')
})

// Endpoint to show configuration
app.get('/config', (c) => {
  const config = process.env.MY_CONFIG || 'Default Config'
  return c.json({ config })
})

// Endpoint to demonstrate secrets
app.get('/secrets', (c) => {
  const secret = process.env.MY_SECRET || 'No Secret Found'
  return c.json({ secret })
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
