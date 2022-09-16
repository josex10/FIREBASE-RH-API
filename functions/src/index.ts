import * as functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/api', (_req: express.Request, res: express.Response) => {
  res.send('red ink api -- documentation can be found at https://github.com/samuel-casey/red-ink-api');
})

exports.app = functions.https.onRequest(app)
