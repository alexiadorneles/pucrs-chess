import { Color } from '../definitions/Color'
import { Position } from '../definitions/Movement'

const ColorOppositeMap: { [key in Color]: Color } = {
  [Color.BLACK]: Color.PINK,
  [Color.PINK]: Color.BLACK,
  [Color.DARK_PINK]: Color.WHITE,
  [Color.WHITE]: Color.DARK_PINK,
}

const isEven = (number: number) => number % 2 === 0

export namespace ColorAdapter {
  export function defineItemColor({ line: line, column: column }: Position): Color {
    const color = isEven(line) ? Color.BLACK : Color.PINK
    return isEven(column) ? color : getOppositeColor(color)
  }

  function getOppositeColor(color: Color): Color {
    return ColorOppositeMap[color]
  }
}
