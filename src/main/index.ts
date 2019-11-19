import { Tabuleiro } from './domain/Tabuleiro'
import { DOMGenerator } from './DOMGenerator'
import axios from 'axios'
import { ItemTabuleiro } from './domain/ItemTabuleiro'
import { Peca } from './domain/peca/Peca'
import { InstanciadorTipoMap, InstanciadorMovimentoMap } from './domain/InstanciadorPecas'
import { Posicao, OffsetMovimento } from './definitions/Movimento'
import { Movimento } from './domain/movimento/Movimento'
import { ModificadorImpl } from './domain/ModificadorImpl'

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
  const model: Peca = Object.assign(peca, carregado)
  const movimentos = model.getMovimentos().map(mov => criarModelMovimento(mov))
  model.setMovimentos(movimentos)
  return model
}

const criarModelMovimento = (carregado: any) => {
  const clazz = InstanciadorMovimentoMap[carregado.tipo]
  const movimento: Movimento = new clazz()
  return Object.assign(movimento, carregado)
}

const tabuleiroInicial = new Tabuleiro().gerarTabuleiroInicial()
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
salvarJogoButton.addEventListener('click', () => DOMGenerator.getInstance().getTabuleiro().salvar())
