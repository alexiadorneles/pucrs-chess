import { Modifier } from '../definitions/Movement'

export class ModifierImpl implements Modifier {
  constructor(
    public quantity: number,
    public apply: (quantity: number, property: number) => number,
  ) {
    this.quantity = quantity
    this.apply = apply.bind(this, quantity)
  }

  static sum = (quantity: number, property: number) => property + quantity
  static minus = (quantity: number, property: number) => property - quantity
}
