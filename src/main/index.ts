import { Tabuleiro } from './domain/Tabuleiro'
import { DOMGenerator } from './DOMGenerator'

const tabuleiroInicial = new Tabuleiro().gerarTabuleiroInicial()
DOMGenerator.getInstance().injetarTabuleiro(tabuleiroInicial)

const novoJogo = (event: MouseEvent) => {
  DOMGenerator.getInstance().injetarTabuleiro(tabuleiroInicial)
  DOMGenerator.getInstance().refresh()
}

const carregarJogo = () => {
  fetch('http://localhost:3000/carregar')
    .then((response) => response.json())
    .then((tabuleiro) => {
      DOMGenerator.getInstance().injetarTabuleiro(tabuleiro)
      DOMGenerator.getInstance().refresh()
    })
}

const novoJogoButton = document.getElementById('novoJogo')
const carregarJogoButton = document.getElementById('carregarJogo')
const salvarJogoButton = document.getElementById('salvarJogo')

novoJogoButton.addEventListener('click', novoJogo)
carregarJogoButton.addEventListener('click', carregarJogo)
salvarJogoButton.addEventListener('click', DOMGenerator.getInstance().getTabuleiro().salvar)
