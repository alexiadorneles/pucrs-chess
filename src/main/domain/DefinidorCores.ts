import { Color } from '../definitions/Cor'
import { Posicao } from '../definitions/Movimento'

export namespace ColorAdapter {
  export function defineItemColor({ linha: line, coluna: column }: Posicao): Color {
    const color = line % 2 === 0 ? Color.WHITE : Color.PINK
    const even = color
    const odds = color == Color.PINK ? Color.WHITE : Color.PINK
    return column % 2 === 0 ? even : odds
  }
}
