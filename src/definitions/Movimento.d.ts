export const enum TipoMovimento {
  HORIZONTAL,
  VERTICAL,
  DIAGONAL,
  L
}

export interface OffsetMovimento {
  coluna: Number
  linha: Number
}
