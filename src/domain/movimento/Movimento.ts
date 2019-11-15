import { Posicao, TipoMovimento, OffsetMovimento } from '../../definitions/Movimento'

export abstract class Movimento {
  constructor(private tipo: TipoMovimento) { }
  protected offsetMovimentos: OffsetMovimento[]

  public getTipo(): TipoMovimento {
    return this.tipo
  }

  public simularMovimento(posicaoAtual: Posicao, podeIrPraTras: boolean): Posicao[] {
    const novasPosicoesFrente = this.offsetMovimentos.map(offset => this.aplicarOffsetParaFrente(offset, posicaoAtual))
    const novasPosicoesTras = this.offsetMovimentos.map(offset => this.aplicarOffsetParaTras(offset, posicaoAtual))
    return podeIrPraTras ? novasPosicoesFrente.concat(novasPosicoesTras) : novasPosicoesFrente
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
