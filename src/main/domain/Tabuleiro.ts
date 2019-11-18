import _ from 'lodash'
import { Cor } from '../definitions/Cor'
import { Posicao } from '../definitions/Movimento'
import { MapPosicaoPecasBrancas } from '../definitions/PosicoesIniciais'
import { TipoPeca } from '../definitions/TipoPeca'
import { DOMGenerator } from '../DOMGenerator'
import { DefinidorCores } from './DefinidorCores'
import { InstanciadorPecas } from './InstanciadorPecas'
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
  private posicoes: Array<Array<ItemTabuleiro>> = initilizarMatriz()
  public pecaEmMovimento: Peca

  public gerarTabuleiroInicial = (): Tabuleiro => {
    const brancas = this.gerarPecas(Cor.BRANCAS)
    const pretas = this.gerarPecas(Cor.ROSA)
    const vazias = this.gerarPecasVazias()
    brancas.concat(pretas).concat(vazias).forEach(this.adicionarItem)
    return this
  }

  public getItem({ linha, coluna }: Posicao): ItemTabuleiro | null {
    const posicaoExiste = this.isPosicaoExistente({ linha, coluna })
    return posicaoExiste ? this.posicoes[linha][coluna] : null
  }

  public destacarPosicoes(posicoes: Posicao[]): void {
    posicoes.forEach((posicao) => {
      if (this.isPosicaoExistente(posicao) && !this.isPosicaoOcupada(posicao)) {
        this.getItem(posicao).setDestaque(true)
      }
    })
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
    const data = new FormData()

    data.append('json', conteudo)
    console.log('conteudo', conteudo)
    const url = 'http://localhost:3000/salvar'
    await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
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

  private percorrerTabuleiro(callback: Function): void {
    for (let linha = 0; linha < 8; linha++)
      for (let coluna = 0; coluna < 8; coluna++)
        callback(this.getItem({ linha, coluna }))
  }

  public isPosicaoValida = (posicao: Posicao): boolean => {
    return this.isPosicaoExistente(posicao) && !this.isPosicaoOcupada(posicao)
  }

  public isPosicaoExistente(posicao: Posicao): boolean {
    return (posicao.coluna < 8 && posicao.coluna >= 0) && (posicao.linha >= 0 && posicao.linha < 8)
  }

  public isPosicaoOcupada(posicao: Posicao): boolean {
    const peca = this.getItem(posicao).getPeca()
    const cor = this.pecaEmMovimento && this.pecaEmMovimento.getCor()
    if (cor && peca) return cor === peca.getCor()
    return Boolean(peca)
  }

  public adicionarItem = (item: ItemTabuleiro) => {
    const { linha, coluna } = item.getPosicao()
    this.posicoes[linha][coluna] = item
    item.adicionarAoTabuleiro(this)
  }

  private gerarPecas(cor: Cor): ItemTabuleiro[] {
    return (Object as any).values(TipoPeca)
      .filter((value: string) => !!value)
      .reduce((agg: ItemTabuleiro[], tipo: TipoPeca) => agg.concat(InstanciadorPecas.instanciar(tipo, cor)), [])
  }

  private gerarPecasVazias(): ItemTabuleiro[] {
    return MapPosicaoPecasBrancas.get(TipoPeca.VAZIO).map(posicao => new ItemTabuleiro(posicao, DefinidorCores.definir(posicao)))
  }
}
