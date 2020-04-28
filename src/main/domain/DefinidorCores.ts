import { Color } from '../definitions/Cor'
import { Position } from '../definitions/Movement'

export namespace ColorAdapter {
  export function defineItemColor({ line: line, column: column }: Position): Color {
    const color = line % 2 === 0 ? Color.WHITE : Color.PINK
    const even = color
    const odds = color == Color.PINK ? Color.WHITE : Color.PINK
    return column % 2 === 0 ? even : odds
  }
}
