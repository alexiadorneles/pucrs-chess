import { MovementOffset, MovementKind } from '../../definitions/Movimento'
import { ModificadorImpl } from '../ModificadorImpl'
import { Movimento } from './Movimento'

export class MovimentoVertical extends Movimento {
  constructor() { super(MovementKind.VERTICAL) }
  public getOffsetMovimentos(): MovementOffset[] {
    return [
      {
        columnModifier: new ModificadorImpl(0, ModificadorImpl.soma),
        lineModifier: new ModificadorImpl(1, ModificadorImpl.soma),
      },
      {
        columnModifier: new ModificadorImpl(0, ModificadorImpl.subtracao),
        lineModifier: new ModificadorImpl(1, ModificadorImpl.subtracao),
      }
    ]
  }
}
