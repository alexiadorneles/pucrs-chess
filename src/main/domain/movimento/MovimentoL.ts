import { Movimento } from './Movimento'
import { TipoMovimento, OffsetMovimento, Posicao } from '../../definitions/Movimento'
import { ModificadorImpl } from '../ModificadorImpl'
import { Peca } from '../peca/Peca'

export class MovimentoL extends Movimento {
  constructor() { super(TipoMovimento.L) }
  protected offsetMovimentos: OffsetMovimento[] = [
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

  public simularMovimento(posicao: Posicao, peca: Peca): Posicao[] {
    return this.offsetMovimentos
      .map(offset => this.criarNovaPosicaoBaseadaEmOffset(posicao, offset))
      .filter(posicao => peca.getTabuleiro().isPosicaoValida(posicao))
  }
}
