import { Posicao, TipoMovimento, OffsetMovimento } from '../../definitions/Movimento'
import { Peca } from '../../domain/peca/Peca'
import { Cor } from '../../definitions/Cor'

export abstract class Movimento {
  constructor(private tipo: TipoMovimento) { }
  protected offsetMovimentos: OffsetMovimento[]

  public getTipo(): TipoMovimento {
    return this.tipo
  }

  public simularMovimento(posicaoAtual: Posicao, peca: Peca): Posicao[] {
    const novasPosicoesFrente = peca.getCor() === Cor.BRANCAS
      ? this.offsetMovimentos.map(offset => this.aplicarOffsetParaFrente(offset, posicaoAtual))
      : this.offsetMovimentos.map(offset => this.aplicarOffsetParaTras(offset, posicaoAtual))
    const novasPosicoesTras = peca.getCor() === Cor.BRANCAS
      ? this.offsetMovimentos.map(offset => this.aplicarOffsetParaTras(offset, posicaoAtual))
      : this.offsetMovimentos.map(offset => this.aplicarOffsetParaFrente(offset, posicaoAtual))
    return peca.isVaiPraTras() ? novasPosicoesFrente.concat(novasPosicoesTras) : novasPosicoesFrente
  }

  private aplicarOffsetParaFrente(offset: OffsetMovimento, posicao: Posicao): Posicao {
    const novaPosicao = { ...posicao }
    novaPosicao.coluna = posicao.coluna + offset.coluna
    novaPosicao.linha = posicao.linha + offset.linha
    return novaPosicao
  }

  private aplicarOffsetParaTras(offset: OffsetMovimento, posicao: Posicao): Posicao {
    const novaPosicao = { ...posicao }
    novaPosicao.coluna = posicao.coluna - offset.coluna
    novaPosicao.linha = posicao.linha - offset.linha
    return novaPosicao
  }
}
