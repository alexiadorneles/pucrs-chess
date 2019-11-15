export const enum TipoMovimento {
  HORIZONTAL,
  VERTICAL,
  DIAGONAL,
  L
}

export interface OffsetMovimento {
  coluna: number
  linha: number
}

export interface Posicao {
  linha: number
  coluna: number
}
