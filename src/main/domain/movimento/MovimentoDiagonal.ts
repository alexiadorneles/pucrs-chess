import { OffsetMovimento, TipoMovimento } from '../../definitions/Movimento'
import { ModificadorImpl } from '../ModificadorImpl'
import { Movimento } from './Movimento'

export class MovimentoDiagonal extends Movimento {
  constructor() { super(TipoMovimento.DIAGONAL) }
  protected offsetMovimentos: OffsetMovimento[] = [
    {
      modificadorLinha: new ModificadorImpl(1, ModificadorImpl.soma),
      modificadorColuna: new ModificadorImpl(1, ModificadorImpl.soma),
    },
    {
      modificadorLinha: new ModificadorImpl(1, ModificadorImpl.soma),
      modificadorColuna: new ModificadorImpl(1, ModificadorImpl.subtracao),
    },
    {
      modificadorLinha: new ModificadorImpl(1, ModificadorImpl.subtracao),
      modificadorColuna: new ModificadorImpl(1, ModificadorImpl.subtracao),
    },
    {
      modificadorLinha: new ModificadorImpl(1, ModificadorImpl.subtracao),
      modificadorColuna: new ModificadorImpl(1, ModificadorImpl.soma),
    },
  ]
}
