import { Modificador } from '../definitions/Movimento'

export class ModificadorImpl implements Modificador {
  constructor(public quantidade: number, public apply: (quantidade: number, propriedade: number) => number) {
    this.quantidade = quantidade
    this.apply = apply.bind(this, quantidade)
  }

  static soma = (quantidade: number, propriedade: number) => propriedade + quantidade
  static subtracao = (quantidade: number, propriedade: number) => propriedade - quantidade
}
