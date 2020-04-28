export const enum MovementKind {
  HORIZONTAL,
  VERTICAL,
  DIAGONAL,
  L,
}

export interface MovementOffset {
  columnModifier: Modifier
  lineModifier: Modifier
}

export interface Modifier {
  quantity: number
  apply: (quantity: number, property?: number) => number
}

export interface Position {
  line: number
  column: number
}
