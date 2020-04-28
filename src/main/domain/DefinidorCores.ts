import { Color } from '../definitions/Cor'
import { Posicao } from '../definitions/Movimento'

export namespace DefinidorCores {
  export function definirCorDoItem({ linha, coluna }: Posicao): Color {
    const cor = linha % 2 === 0 ? Color.WHITE : Color.PINK
    const pares = cor
    const impares = cor == Color.PINK ? Color.WHITE : Color.PINK
    return coluna % 2 === 0 ? pares : impares
  }
}
