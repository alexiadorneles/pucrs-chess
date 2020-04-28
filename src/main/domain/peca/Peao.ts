import _ from 'lodash'
import { Color } from '../../definitions/Color'
import { Position } from '../../definitions/Movement'
import { PieceKind } from '../../definitions/PieceKind'
import { MovimentoVertical } from '../movimento/MovimentoVertical'
import { Peca } from './Peca'

export class Peao extends Peca {
  constructor(cor: Color) {
    const movimentos = [new MovimentoVertical()]
    super(PieceKind.PAWN, cor, movimentos, false)
  }

  public simularMovimento(): Position[] {
    const posicaoAtual = this.itemTabuleiro.getPosicao()
    const novaPosicao = this.getNovaPosicaoByCor(posicaoAtual)
    const possiveisAtaques = this.getAtaqueByCor(posicaoAtual)
    return _.compact([novaPosicao, ...possiveisAtaques])
  }

  private getNovaPosicaoByCor({ line, column }: Position): Position | null {
    const novaLinha = this.cor === Color.GREY ? ++line : --line
    const novaPosicao = { line: novaLinha, column }
    const isOcupada = this.getTabuleiro().isPosicaoOcupada(novaPosicao)
    return (!isOcupada && novaPosicao) || null
  }

  private getAtaqueByCor(posicaoAtual: Position): Position[] {
    const clone = { ...posicaoAtual }
    const novaLinha = this.cor === Color.GREY ? ++clone.line : --clone.line
    const novaPosicao = { line: novaLinha, column: clone.column }
    const { line, column } = novaPosicao
    const diagonalDireita = { line, column: column + 1 }
    const diagonalEsquerda = { line, column: column - 1 }
    const ataques = [diagonalDireita, diagonalEsquerda]
    return ataques.filter(posicao =>
      this.getTabuleiro().isBloqueadaPorOponente(posicao, posicaoAtual),
    )
  }
}
