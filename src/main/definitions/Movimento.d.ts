export const enum TipoMovimento {
  HORIZONTAL,
  VERTICAL,
  DIAGONAL,
  L
}

export interface OffsetMovimento {
  modificadorColuna: Modificador
  modificadorLinha: Modificador
}

export interface Modificador {
  quantidade: number
  apply: Function
}

export interface Posicao {
  linha: number
  coluna: number
}
