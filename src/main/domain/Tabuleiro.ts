import axios from 'axios'
import _ from 'lodash'
import { Color } from '../definitions/Color'
import { Position } from '../definitions/Movement'
import { WhitePiecesPositionMap } from '../definitions/InitialPositions'
import { TipoPeca } from '../definitions/TipoPeca'
import { DOMGenerator } from '../DOMGenerator'
import { ColorAdapter } from './DefinidorCores'
import { PieceBuilder } from './PieceBuilder'
import { ItemTabuleiro } from './ItemTabuleiro'
import { Peca } from './peca/Peca'


const initilizarMatriz = (): ItemTabuleiro[][] => {
  const itens = []
  itens[0] = []
  itens[1] = []
  itens[2] = []
  itens[3] = []
  itens[4] = []
  itens[5] = []
  itens[6] = []
  itens[7] = []
  return itens
}

export class Tabuleiro {
  public posicoes: Array<Array<ItemTabuleiro>> = initilizarMatriz()
  public pecaEmMovimento: Peca

  public gerarTabuleiroInicial = (): Tabuleiro => {
    const brancas = this.gerarPecas(Color.BLACK)
    const pretas = this.gerarPecas(Color.GREY)
    const vazias = this.gerarPecasVazias()
    brancas.concat(pretas).concat(vazias).forEach(this.adicionarItem)
    return this
  }

  public getItem({ line: linha, column: coluna }: Position): ItemTabuleiro | null {
    const posicaoExiste = this.isPosicaoExistente({ line: linha, column: coluna })
    return posicaoExiste ? this.posicoes[linha][coluna] : null
  }

  public destacarPosicoes(posicoes: Position[]): void {
    posicoes.forEach((posicao) =>
      this.getItem(posicao).setDestaque(true)
    )
  }

  public removerDestaques(): void {
    const removerDestaque = (item: ItemTabuleiro) => item.removerDestaque()
    this.percorrerTabuleiro(removerDestaque)
  }

  public salvar = async (): Promise<void> => {
    this.percorrerTabuleiro((item: ItemTabuleiro) => {
      item.setTabuleiro(null)
      if (item.getPeca()) {
        item.getPeca().adicionarAoItem(null)
      }
    })
    const conteudo = JSON.stringify(this)
    const url = 'http://localhost:3000/salvar'
    const config = { headers: { 'Content-Type': 'application/json' } }
    const data = { json: conteudo }
    await axios.post(url, data, config)
  }

  public isBloqueadaPorOponente(posicao: Position, posicaoInicial: Position): boolean {
    const bloqueante = this.isPosicaoExistente(posicao) && this.isPosicaoOcupada(posicao)
    const corBloqueante = bloqueante && this.isPosicaoOcupada(posicao).getCor()
    const corBloqueada = this.getItem(posicaoInicial).getPeca().getCor()
    return (corBloqueante) && (corBloqueada !== corBloqueante)
  }

  public setPecaEmMovimento(peca: Peca): void {
    if (this.pecaEmMovimento && !_.isEqual(this.pecaEmMovimento, peca)) {
      this.removerDestaques()
    }
    this.pecaEmMovimento = peca
  }

  public isPecaEmMovimento(): boolean {
    return !!this.pecaEmMovimento
  }

  public moverPeca(itemClicado: ItemTabuleiro): void {
    const itemDaPeca = this.pecaEmMovimento.getItemTabuleiro()
    itemClicado.atribuirPeca(this.pecaEmMovimento)
    this.pecaEmMovimento = null
    itemDaPeca.atribuirPeca(null)
    DOMGenerator.getInstance().refresh()
  }

  public percorrerTabuleiro(callback: (item: ItemTabuleiro, posicao?: Position) => void): void {
    for (let linha = 0; linha < 8; linha++)
      for (let coluna = 0; coluna < 8; coluna++)
        callback(this.getItem({ line: linha, column: coluna }), { line: linha, column: coluna })
  }

  public isPosicaoValida = (posicao: Position): boolean => {
    return this.isPosicaoExistente(posicao) && !this.isPosicaoOcupada(posicao)
  }

  public isPosicaoExistente(posicao: Position): boolean {
    return (posicao.column < 8 && posicao.column >= 0) && (posicao.line >= 0 && posicao.line < 8)
  }

  public isPosicaoOcupada(posicao: Position): Peca | null {
    return this.isPosicaoExistente(posicao) ? this.getItem(posicao).getPeca() : null
  }

  public adicionarItem = (item: ItemTabuleiro) => {
    const { line: linha, column: coluna } = item.getPosicao()
    this.posicoes[linha][coluna] = item
    item.adicionarAoTabuleiro(this)
  }

  private gerarPecas(cor: Color): ItemTabuleiro[] {
    return (Object as any).values(TipoPeca)
      .filter((value: string) => !!value)
      .reduce((agg: ItemTabuleiro[], tipo: TipoPeca) => agg.concat(PieceBuilder.build(tipo, cor)), [])
  }

  private gerarPecasVazias(): ItemTabuleiro[] {
    return WhitePiecesPositionMap.get(TipoPeca.VAZIO).map(posicao => new ItemTabuleiro(posicao, ColorAdapter.defineItemColor(posicao)))
  }
}
