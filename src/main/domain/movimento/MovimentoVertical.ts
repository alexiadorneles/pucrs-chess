import { OffsetMovimento, TipoMovimento } from '../../definitions/Movimento'
import { ModificadorImpl } from '../ModificadorImpl'
import { Movimento } from './Movimento'

export class MovimentoVertical extends Movimento {
  constructor() { super(TipoMovimento.VERTICAL) }
  protected offsetMovimentos: OffsetMovimento[] = [
    {
      modificadorColuna: new ModificadorImpl(0, ModificadorImpl.soma),
      modificadorLinha: new ModificadorImpl(1, ModificadorImpl.soma),
    },
    {
      modificadorColuna: new ModificadorImpl(0, ModificadorImpl.subtracao),
      modificadorLinha: new ModificadorImpl(1, ModificadorImpl.subtracao),
    }
  ]
}
