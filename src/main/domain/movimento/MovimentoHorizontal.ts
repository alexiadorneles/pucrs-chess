import { OffsetMovimento, TipoMovimento } from '../../definitions/Movimento'
import { ModificadorImpl } from '../ModificadorImpl'
import { Movimento } from './Movimento'

export class MovimentoHorizontal extends Movimento {
  constructor() { super(TipoMovimento.HORIZONTAL) }
  protected offsetMovimentos: OffsetMovimento[] = [
    {
      modificadorColuna: new ModificadorImpl(1, ModificadorImpl.soma),
      modificadorLinha: new ModificadorImpl(0, ModificadorImpl.soma),
    },
    {
      modificadorColuna: new ModificadorImpl(1, ModificadorImpl.subtracao),
      modificadorLinha: new ModificadorImpl(0, ModificadorImpl.soma),
    },
  ]
}
