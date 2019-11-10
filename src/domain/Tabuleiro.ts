import { ItemTabuleiro } from './ItemTabuleiro'
import { Cor } from '../definitions/Cor';
import { Peao } from './peca/Peoes';
import { MovimentoVertical } from './movimento/MovimentoVertical';
import { Posicao } from '../definitions/Movimento';

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

  public gerarTabuleiroInicial() {
    const peoesBrancos = this.instanciarPeoes(Cor.BRANCAS);

    for (let linha = 0; linha < 8; linha++) {
      const cor = linha % 2 === 0 ? Cor.VERDES : Cor.PRETAS
      const pares = cor
      const impares = cor == Cor.VERDES ? Cor.PRETAS : Cor.VERDES
      this.adicionarItem(new ItemTabuleiro(linha, linha, pares), linha, 0)
      this.adicionarItem(new ItemTabuleiro(linha, linha, impares), linha, 1)
      this.adicionarItem(new ItemTabuleiro(linha, linha, pares), linha, 2)
      this.adicionarItem(new ItemTabuleiro(linha, linha, impares), linha, 3)
      this.adicionarItem(new ItemTabuleiro(linha, linha, pares), linha, 4)
      this.adicionarItem(new ItemTabuleiro(linha, linha, impares), linha, 5)
      this.adicionarItem(new ItemTabuleiro(linha, linha, pares), linha, 6)
      this.adicionarItem(new ItemTabuleiro(linha, linha, impares), linha, 7)
    }

    const linha = 1
    for (let coluna = 0; coluna < 8; coluna++) {
      const pares = Cor.PRETAS
      const impares = Cor.VERDES
      const cor = coluna % 2 === 0 ? pares : impares
      const item = new ItemTabuleiro(linha, coluna, cor)
      item.adicionarPeca(peoesBrancos[coluna])
      this.adicionarItem(item, linha, coluna)
    }
  }

  public getItem({ linha, coluna }: Posicao) {
    return this.posicoes[linha][coluna]
  }

  public destacarPosicoes(posicoes: Posicao[]) {
    posicoes.forEach(posicao => {
      if (this.isPosicaoValida(posicao)) {
        this.getItem(posicao).setDestaque(true)
      }
    })
  }

  public removerDestaques() {
    const removerDestaque = (item: ItemTabuleiro) => item.removerDestaque()
    this.percorrerTabuleiro(removerDestaque)
  }

  private percorrerTabuleiro(callback: Function): void {
    for (let linha = 0; linha < 8; linha++)
      for (let coluna = 0; coluna < 8; coluna++)
        callback(this.getItem({ linha, coluna }))
  }

  private isPosicaoValida(posicao: Posicao) {
    const posicaoExiste = posicao.coluna < 8 && posicao.linha >= 0
    const posicaoLivre = !Boolean(this.getItem(posicao).getPeca())
    return posicaoExiste && posicaoLivre
  }

  private adicionarItem(item: ItemTabuleiro, linha: number, coluna: number) {
    this.posicoes[linha][coluna] = item
    item.adicionarAoTabuleiro(this)
  }

  private instanciarPeoes(cor: Cor): Peao[] {
    const peoes: Peao[] = []
    const movimentos = [new MovimentoVertical()]
    for (let i = 0; i < 8; i++) {
      const peao = new Peao(cor, movimentos)
      peoes.push(peao)
    }
    return peoes
  }
}
