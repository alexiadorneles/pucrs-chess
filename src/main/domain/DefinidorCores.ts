import { Cor } from '../definitions/Cor'
import { Posicao } from '../definitions/Movimento'

export namespace DefinidorCores {
  export function definirCorDoItem({ linha, coluna }: Posicao): Cor {
    const cor = linha % 2 === 0 ? Cor.BRANCAS : Cor.ROSA
    const pares = cor
    const impares = cor == Cor.ROSA ? Cor.BRANCAS : Cor.ROSA
    return coluna % 2 === 0 ? pares : impares
  }
}
