import { Modifier } from '../definitions/Movement'

export class ModificadorImpl implements Modifier {
  constructor(public quantity: number, public apply: (quantidade: number, propriedade: number) => number) {
    this.quantity = quantity
    this.apply = apply.bind(this, quantity)
  }

  static soma = (quantidade: number, propriedade: number) => propriedade + quantidade
  static subtracao = (quantidade: number, propriedade: number) => propriedade - quantidade
}
