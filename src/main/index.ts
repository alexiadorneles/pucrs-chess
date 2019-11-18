import { Tabuleiro } from './domain/Tabuleiro'
import { DOMGenerator } from './DOMGenerator'
import axios from 'axios'
import { ItemTabuleiro } from './domain/ItemTabuleiro'
import { Peca } from './domain/peca/Peca'
import { InstanciadorTipoMap } from './domain/InstanciadorPecas'
import { Posicao } from './definitions/Movimento'

const criarModelTabuleiro = (carregado: Tabuleiro) => {
  const tabuleiro = new Tabuleiro()
  return Object.assign(tabuleiro, carregado)
}

const criarModelItem = (carregado: any): ItemTabuleiro => {
  const itemTabuleiro = new ItemTabuleiro(carregado.posicao, carregado.cor)
  return Object.assign(itemTabuleiro, carregado)
}

const criarModelPeca = (carregado: any): Peca => {
  const clazz = InstanciadorTipoMap.get(carregado.tipo)
  const peca = new clazz(carregado.cor)
  return Object.assign(peca, carregado)
}

const tabuleiroInicial = new Tabuleiro().gerarTabuleiroInicial()
DOMGenerator.getInstance().injetarTabuleiro(tabuleiroInicial)

const novoJogo = (event: MouseEvent) => {
  DOMGenerator.getInstance().injetarTabuleiro(tabuleiroInicial)
  DOMGenerator.getInstance().refresh()
}

const carregarJogo = async () => {
  const response = await axios.get('http://localhost:3000/carregar')
  const tabuleiro = criarModelTabuleiro(response.data)

  tabuleiro.percorrerTabuleiro((item: any, { linha, coluna }: Posicao) => {
    const itemModel = criarModelItem(item)
    if (itemModel.getPeca()) {
      const pecaModel = criarModelPeca(itemModel.getPeca())
      itemModel.atribuirPeca(pecaModel)
    }
    tabuleiro.posicoes[linha][coluna] = itemModel
    itemModel.adicionarAoTabuleiro(tabuleiro)
  })

  DOMGenerator.getInstance().injetarTabuleiro(tabuleiro)
  DOMGenerator.getInstance().refresh()
}

const novoJogoButton = document.getElementById('novoJogo')
const carregarJogoButton = document.getElementById('carregarJogo')
const salvarJogoButton = document.getElementById('salvarJogo')

novoJogoButton.addEventListener('click', novoJogo)
carregarJogoButton.addEventListener('click', carregarJogo)
salvarJogoButton.addEventListener('click', DOMGenerator.getInstance().getTabuleiro().salvar)
