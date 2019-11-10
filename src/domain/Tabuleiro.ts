import { ItemTabuleiro } from './ItemTabuleiro'
import { Cor } from '../definitions/Cor';
import { Peao } from './peca/Peoes';
import { MovimentoVertical } from './movimento/MovimentoVertical';

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
      const cor = linha % 2 == 0 ? Cor.BRANCAS : Cor.PRETAS
      this.posicoes[linha][0] = new ItemTabuleiro(linha, linha, cor)
      this.posicoes[linha][1] = new ItemTabuleiro(linha, linha, cor)
      this.posicoes[linha][2] = new ItemTabuleiro(linha, linha, cor)
      this.posicoes[linha][3] = new ItemTabuleiro(linha, linha, cor)
      this.posicoes[linha][4] = new ItemTabuleiro(linha, linha, cor)
      this.posicoes[linha][5] = new ItemTabuleiro(linha, linha, cor)
      this.posicoes[linha][6] = new ItemTabuleiro(linha, linha, cor)
      this.posicoes[linha][7] = new ItemTabuleiro(linha, linha, cor)
    }

    const linha = 1
    for (let coluna = 0; coluna < 8; coluna++) {
      const item = new ItemTabuleiro(linha, coluna, Cor.PRETAS)
      item.adicionarPeca(peoesBrancos[coluna])
      this.posicoes[linha][coluna] = item
    }
  }

  public getItem(linha: number, coluna: number) {
    return this.posicoes[linha][coluna]
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
