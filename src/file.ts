import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import { Request, Response } from 'express-serve-static-core'
import cors from 'cors'

const carregarTabuleiro = (req, res) => {
  const a = process.cwd()
  console.log(a);

  const file = fs.readFileSync(`${process.cwd()}/src/tabuleiro.json`)
  console.log(file.toString())
  res.send(file.toString())
  res.end(file.toString())
}

const escreverJSON = (req: Request, res: Response) => {
  console.dir('body', req.body)
  fs.writeFile(`${process.cwd()}/src/tabuleiro.json`, req.body, function (err) {
    if (err) {
      return console.log(err)
    }
    console.log('The file was saved!')
  })
}

const app = express()
app.options('*', cors())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(3000, () => console.log(`Express server is listening`))
app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE') // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype') // If needed
  res.setHeader('Access-Control-Allow-Credentials', true) // If needed
  res.send('cors problem fixed:)')
})
app.get('/carregar', carregarTabuleiro)
app.post('/salvar', escreverJSON)
