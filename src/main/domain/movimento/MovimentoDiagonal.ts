import { MovementOffset, MovementKind } from '../../definitions/Movement'
import { ModificadorImpl } from '../ModificadorImpl'
import { Movimento } from './Movimento'

export class MovimentoDiagonal extends Movimento {
  constructor() { super(MovementKind.DIAGONAL) }
  public getOffsetMovimentos(): MovementOffset[] {
    return [
      {
        lineModifier: new ModificadorImpl(1, ModificadorImpl.soma),
        columnModifier: new ModificadorImpl(1, ModificadorImpl.soma),
      },
      {
        lineModifier: new ModificadorImpl(1, ModificadorImpl.soma),
        columnModifier: new ModificadorImpl(1, ModificadorImpl.subtracao),
      },
      {
        lineModifier: new ModificadorImpl(1, ModificadorImpl.subtracao),
        columnModifier: new ModificadorImpl(1, ModificadorImpl.subtracao),
      },
      {
        lineModifier: new ModificadorImpl(1, ModificadorImpl.subtracao),
        columnModifier: new ModificadorImpl(1, ModificadorImpl.soma),
      },
    ]
  }
}
