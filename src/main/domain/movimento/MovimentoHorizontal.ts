import { MovementOffset, MovementKind } from '../../definitions/Movimento'
import { ModificadorImpl } from '../ModificadorImpl'
import { Movimento } from './Movimento'

export class MovimentoHorizontal extends Movimento {
  constructor() { super(MovementKind.HORIZONTAL) }
  public getOffsetMovimentos(): MovementOffset[] {
    return [
      {
        columnModifier: new ModificadorImpl(1, ModificadorImpl.soma),
        lineModifier: new ModificadorImpl(0, ModificadorImpl.soma),
      },
      {
        columnModifier: new ModificadorImpl(1, ModificadorImpl.subtracao),
        lineModifier: new ModificadorImpl(0, ModificadorImpl.soma),
      },
    ]
  }
}
