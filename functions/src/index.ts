import * as functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import { RoleRouter } from './router_v1/role.router'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const routesForRoles = new RoleRouter()
app.use('/api', routesForRoles.router)

app.get('/api', (_req: express.Request, res: express.Response) => {
  res.send('API FOOR TESTING FIREBASE')
})

exports.app = functions.https.onRequest(app)
