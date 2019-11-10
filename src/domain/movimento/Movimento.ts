import { TipoMovimento } from 'definitions/Movimento'

export abstract class Movimento {
  constructor(private tipo: TipoMovimento) { }
}
