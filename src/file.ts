import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { Request, Response } from 'express-serve-static-core'
import fs from 'fs'

const LOCAL_FOLDER = process.cwd()

const loadBoard = (req: Request, res: Response) => {
  const file = fs.readFileSync(`${LOCAL_FOLDER}/src/board.json`)
  res.send(file.toString())
  res.end(file.toString())
}

const writeJSON = (req: Request, res: Response) => {
  const { json } = req.body
  fs.writeFileSync(`${LOCAL_FOLDER}/src/board.json`, json)
}

const app = express()
app.options('*', cors())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(9090, () => console.log(`Express server is listening`))
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype')
})
app.get('/load', loadBoard)
app.post('/save', writeJSON)
