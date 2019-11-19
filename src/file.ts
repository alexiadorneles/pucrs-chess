import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { Request, Response } from 'express-serve-static-core'
import fs from 'fs'

const PASTA_LOCAL = process.cwd()

const carregarTabuleiro = (req: Request, res: Response) => {
  const arquivo = fs.readFileSync(`${PASTA_LOCAL}/src/tabuleiro.json`)
  res.send(arquivo.toString())
  res.end(arquivo.toString())
}

const escreverJSON = (req: Request, res: Response) => {
  console.log(new Date(), '    Saving Board...')
  const body = req.body
  const { json } = body
  fs.writeFileSync(`${PASTA_LOCAL}/src/tabuleiro.json`, json)
}

const app = express()
app.options('*', cors())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(3000, () => console.log(`Express server is listening`))
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype')
  res.send('cors problem fixed:)')
})
app.get('/carregar', carregarTabuleiro)
app.post('/salvar', escreverJSON)
