import { Posicao } from 'main/definitions/Movimento'

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

  public static extenderDiagonal = (posicao: Posicao): Posicao[] => {
    const offsetColuna = 8 - posicao.coluna
    let novaPosicao = { linha: posicao.linha, coluna: posicao.coluna }
    const novasPosicoes: Posicao[] = []
    while (novaPosicao.coluna < 8) {
      let { linha, coluna } = novaPosicao
      novaPosicao = { linha: ++linha, coluna: ++coluna }
      novasPosicoes.push(novaPosicao)
    }
    novaPosicao = { linha: posicao.linha, coluna: posicao.coluna }
    while (novaPosicao.coluna >= 0) {
      let { linha, coluna } = novaPosicao
      novaPosicao = { linha: ++linha, coluna: --coluna }
      novasPosicoes.push(novaPosicao)
    }
    novaPosicao = { linha: posicao.linha, coluna: posicao.coluna }
    while (novaPosicao.coluna < 8) {
      let { linha, coluna } = novaPosicao
      novaPosicao = { linha: --linha, coluna: ++coluna }
      novasPosicoes.push(novaPosicao)
    }
    novaPosicao = { linha: posicao.linha, coluna: posicao.coluna }
    while (novaPosicao.coluna >= 0) {
      let { linha, coluna } = novaPosicao
      novaPosicao = { linha: --linha, coluna: --coluna }
      novasPosicoes.push(novaPosicao)
    }

    return novasPosicoes
  }

  public static extenderL = (posicoes: Posicao[]): Posicao[] => {
    return posicoes.reduce((agg, { linha, coluna }) => {
      const novasPosicoes: Posicao[] = []
      novasPosicoes.push({ linha: linha + 2, coluna: coluna + 1 })
      novasPosicoes.push({ linha: linha - 2, coluna: coluna + 1 })
      novasPosicoes.push({ linha: linha - 2, coluna: coluna - 1 })
      novasPosicoes.push({ linha: linha + 2, coluna: coluna - 1 })
      novasPosicoes.push({ linha: linha + 1, coluna: coluna + 2 })
      novasPosicoes.push({ linha: linha + 1, coluna: coluna - 2 })
      novasPosicoes.push({ linha: linha - 1, coluna: coluna + 2 })
      novasPosicoes.push({ linha: linha - 1, coluna: coluna - 2 })
      return agg.concat(novasPosicoes)
    }, [])
  }
}
