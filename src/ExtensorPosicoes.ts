import { Posicao } from 'definitions/Movimento'

export abstract class ExtensorPosicoes {
  public static extenderVertical = (posicoes: Posicao[]): Posicao[] => {
    return posicoes.reduce((agg, { linha, coluna }) => {
      const novasPosicoes: Posicao[] = []
      for (let i = linha; i < 8; i++) {
        novasPosicoes.push({ linha: i, coluna })
      }
      return agg.concat(novasPosicoes)
    }, [])
  }

  public static extenderHorizontal = (posicoes: Posicao[]): Posicao[] => {
    return posicoes.reduce((agg, { linha, coluna }) => {
      const novasPosicoes: Posicao[] = []
      for (let i = coluna; i < 8; i++) {
        novasPosicoes.push({ linha, coluna: i })
      }
      return agg.concat(novasPosicoes)
    }, [])
  }

  public static extenderDiagonal = (posicoes: Posicao[]): Posicao[] => {
    return posicoes.reduce((agg, { linha, coluna }) => {
      const novasPosicoes: Posicao[] = []
      for (let i = coluna; i < 8; i++) {
        novasPosicoes.push({ linha: i, coluna: i })
      }
      for (let i = linha; i < 8; i++) {
        novasPosicoes.push({ linha: i, coluna: i })
      }
      return agg.concat(novasPosicoes)
    }, [])
  }
}
