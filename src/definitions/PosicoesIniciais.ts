import { Posicao } from '../definitions/Movimento'
import { TipoPeca } from '../definitions/TipoPeca'

const posicaoPeoesBrancos = [
  { linha: 1, coluna: 0 },
  { linha: 1, coluna: 1 },
  { linha: 1, coluna: 2 },
  { linha: 1, coluna: 3 },
  { linha: 1, coluna: 4 },
  { linha: 1, coluna: 5 },
  { linha: 1, coluna: 6 },
  { linha: 1, coluna: 7 },
]

const posicaoTorresBrancas = [
  { linha: 0, coluna: 0 },
  { linha: 0, coluna: 7 },
]

const posicaoCavalosBrancos = [
  { linha: 0, coluna: 1 },
  { linha: 0, coluna: 6 },
]

const posicaoBisposBrancos = [
  { linha: 0, coluna: 2 },
  { linha: 0, coluna: 5 },
]

const posicaoRainha = [
  { linha: 0, coluna: 3 },
]

const posicaoRei = [
  { linha: 0, coluna: 4 },
]

const vazios = [
  { linha: 2, coluna: 0 },
  { linha: 2, coluna: 1 },
  { linha: 2, coluna: 2 },
  { linha: 2, coluna: 3 },
  { linha: 2, coluna: 4 },
  { linha: 2, coluna: 5 },
  { linha: 2, coluna: 6 },
  { linha: 2, coluna: 7 },
  { linha: 3, coluna: 0 },
  { linha: 3, coluna: 1 },
  { linha: 3, coluna: 2 },
  { linha: 3, coluna: 3 },
  { linha: 3, coluna: 4 },
  { linha: 3, coluna: 5 },
  { linha: 3, coluna: 6 },
  { linha: 3, coluna: 7 },
  { linha: 4, coluna: 0 },
  { linha: 4, coluna: 1 },
  { linha: 4, coluna: 2 },
  { linha: 4, coluna: 3 },
  { linha: 4, coluna: 4 },
  { linha: 4, coluna: 5 },
  { linha: 4, coluna: 6 },
  { linha: 4, coluna: 7 },
  { linha: 5, coluna: 0 },
  { linha: 5, coluna: 1 },
  { linha: 5, coluna: 2 },
  { linha: 5, coluna: 3 },
  { linha: 5, coluna: 4 },
  { linha: 5, coluna: 5 },
  { linha: 5, coluna: 6 },
  { linha: 5, coluna: 7 },
]

export const MapPosicaoPecasBrancas: Map<TipoPeca, Posicao[]> = new Map([
  [TipoPeca.PEAO, posicaoPeoesBrancos],
  [TipoPeca.TORRE, posicaoTorresBrancas],
  [TipoPeca.CAVALO, posicaoCavalosBrancos],
  [TipoPeca.BISPO, posicaoBisposBrancos],
  [TipoPeca.RAINHA, posicaoRainha],
  [TipoPeca.REI, posicaoRei],
  [TipoPeca.VAZIO, vazios],
])

const posicaoPeoesPretos = [
  { linha: 6, coluna: 0 },
  { linha: 6, coluna: 1 },
  { linha: 6, coluna: 2 },
  { linha: 6, coluna: 3 },
  { linha: 6, coluna: 4 },
  { linha: 6, coluna: 5 },
  { linha: 6, coluna: 6 },
  { linha: 6, coluna: 7 },
]

const posicaoTorresPretos = [
  { linha: 7, coluna: 0 },
  { linha: 7, coluna: 7 },
]

const posicaoCavalosPretos = [
  { linha: 7, coluna: 1 },
  { linha: 7, coluna: 6 },
]

const posicaoBisposPretos = [
  { linha: 7, coluna: 2 },
  { linha: 7, coluna: 5 },
]

const posicaoRainhaPreto = [
  { linha: 7, coluna: 3 },
]

const posicaoReiPreto = [
  { linha: 7, coluna: 4 },
]

export const MapPosicaoPecasPretas: Map<TipoPeca, Posicao[]> = new Map([
  [TipoPeca.PEAO, posicaoPeoesPretos],
  [TipoPeca.TORRE, posicaoTorresPretos],
  [TipoPeca.CAVALO, posicaoCavalosPretos],
  [TipoPeca.BISPO, posicaoBisposPretos],
  [TipoPeca.RAINHA, posicaoRainhaPreto],
  [TipoPeca.REI, posicaoReiPreto],
])
