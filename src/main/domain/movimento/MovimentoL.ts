import { OffsetMovimento, Posicao, TipoMovimento } from '../../definitions/Movimento'
import { ModificadorImpl } from '../ModificadorImpl'
import { Tabuleiro } from '../Tabuleiro'
import { Movimento } from './Movimento'

export class MovimentoL extends Movimento {
  constructor() { super(TipoMovimento.L) }
  public getOffsetMovimentos(): OffsetMovimento[] {
    return [
      {
        modificadorLinha: new ModificadorImpl(2, ModificadorImpl.soma),
        modificadorColuna: new ModificadorImpl(1, ModificadorImpl.soma),
      },
      {
        modificadorLinha: new ModificadorImpl(2, ModificadorImpl.soma),
        modificadorColuna: new ModificadorImpl(1, ModificadorImpl.subtracao),
      },
      {
        modificadorLinha: new ModificadorImpl(2, ModificadorImpl.subtracao),
        modificadorColuna: new ModificadorImpl(1, ModificadorImpl.subtracao),
      },
      {
        modificadorLinha: new ModificadorImpl(2, ModificadorImpl.subtracao),
        modificadorColuna: new ModificadorImpl(1, ModificadorImpl.soma),
      },
      {
        modificadorLinha: new ModificadorImpl(1, ModificadorImpl.soma),
        modificadorColuna: new ModificadorImpl(2, ModificadorImpl.soma),
      },
      {
        modificadorLinha: new ModificadorImpl(1, ModificadorImpl.subtracao),
        modificadorColuna: new ModificadorImpl(2, ModificadorImpl.soma),
      },
      {
        modificadorLinha: new ModificadorImpl(1, ModificadorImpl.subtracao),
        modificadorColuna: new ModificadorImpl(2, ModificadorImpl.subtracao),
      },
      {
        modificadorLinha: new ModificadorImpl(1, ModificadorImpl.soma),
        modificadorColuna: new ModificadorImpl(2, ModificadorImpl.subtracao),
      },
    ]
  }

  public simularMovimento(posicao: Posicao, tabuleiro: Tabuleiro): Posicao[] {
    return this.getOffsetMovimentos()
      .map(offset => this.criarNovaPosicaoBaseadaEmOffset(posicao, offset))
      .filter(posicao => tabuleiro.isPosicaoValida(posicao))
  }
}
