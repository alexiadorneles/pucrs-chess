import { Posicao } from '../definitions/Movimento'
import { Cor } from '../definitions/Cor'

export namespace DefinidorCores {
  export function definir({ linha, coluna }: Posicao): Cor {
    const cor = linha % 2 === 0 ? Cor.VERDES : Cor.PRETAS
    const pares = cor
    const impares = cor == Cor.VERDES ? Cor.PRETAS : Cor.VERDES
    return coluna % 2 === 0 ? pares : impares
  }
}
