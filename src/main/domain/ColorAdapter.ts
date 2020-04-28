import { Color } from '../definitions/Color'
import { Position } from '../definitions/Movement'

export namespace ColorAdapter {
  export function defineItemColor({ line: line, column: column }: Position): Color {
    const color = line % 2 === 0 ? Color.BLACK : Color.PINK
    const even = color
    const odds = color == Color.PINK ? Color.BLACK : Color.PINK
    return column % 2 === 0 ? even : odds
  }
}
