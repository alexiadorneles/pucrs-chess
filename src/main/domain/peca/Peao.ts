import _ from 'lodash'
import { Color } from '../../definitions/Cor'
import { Posicao } from '../../definitions/Movimento'
import { TipoPeca } from '../../definitions/TipoPeca'
import { MovimentoVertical } from '../movimento/MovimentoVertical'
import { Peca } from './Peca'

export class Peao extends Peca {
  constructor(cor: Color) {
    const movimentos = [new MovimentoVertical()]
    super(TipoPeca.PEAO, cor, movimentos, false)
  }

  public simularMovimento(): Posicao[] {
    const posicaoAtual = this.itemTabuleiro.getPosicao()
    const novaPosicao = this.getNovaPosicaoByCor(posicaoAtual)
    const possiveisAtaques = this.getAtaqueByCor(posicaoAtual)
    return _.compact([novaPosicao, ...possiveisAtaques])
  }

  private getNovaPosicaoByCor({ linha, coluna }: Posicao): Posicao | null {
    const novaLinha = this.cor === Color.GREY ? ++linha : --linha
    const novaPosicao = { linha: novaLinha, coluna }
    const isOcupada = this.getTabuleiro().isPosicaoOcupada(novaPosicao)
    return !isOcupada && novaPosicao || null
  }

  private getAtaqueByCor(posicaoAtual: Posicao): Posicao[] {
    const clone = { ...posicaoAtual }
    const novaLinha = this.cor === Color.GREY ? ++clone.linha : --clone.linha
    const novaPosicao = { linha: novaLinha, coluna: clone.coluna }
    const { linha, coluna } = novaPosicao
    const diagonalDireita = { linha, coluna: coluna + 1 }
    const diagonalEsquerda = { linha, coluna: coluna - 1 }
    const ataques = [diagonalDireita, diagonalEsquerda]
    return ataques.filter(posicao => this.getTabuleiro().isBloqueadaPorOponente(posicao, posicaoAtual))
  }
}
