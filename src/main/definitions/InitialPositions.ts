import { Position } from './Movement'
import { TipoPeca } from './TipoPeca'

const posicaoPeoesBrancos = [
  { line: 1, column: 0 },
  { line: 1, column: 1 },
  { line: 1, column: 2 },
  { line: 1, column: 3 },
  { line: 1, column: 4 },
  { line: 1, column: 5 },
  { line: 1, column: 6 },
  { line: 1, column: 7 },
]

const posicaoTorresBrancas = [
  { line: 0, column: 0 },
  { line: 0, column: 7 },
]

const posicaoCavalosBrancos = [
  { line: 0, column: 1 },
  { line: 0, column: 6 },
]

const posicaoBisposBrancos = [
  { line: 0, column: 2 },
  { line: 0, column: 5 },
]

const posicaoRainha = [{ line: 0, column: 3 }]

const posicaoRei = [{ line: 0, column: 4 }]

const vazios = [
  { line: 2, column: 0 },
  { line: 2, column: 1 },
  { line: 2, column: 2 },
  { line: 2, column: 3 },
  { line: 2, column: 4 },
  { line: 2, column: 5 },
  { line: 2, column: 6 },
  { line: 2, column: 7 },
  { line: 3, column: 0 },
  { line: 3, column: 1 },
  { line: 3, column: 2 },
  { line: 3, column: 3 },
  { line: 3, column: 4 },
  { line: 3, column: 5 },
  { line: 3, column: 6 },
  { line: 3, column: 7 },
  { line: 4, column: 0 },
  { line: 4, column: 1 },
  { line: 4, column: 2 },
  { line: 4, column: 3 },
  { line: 4, column: 4 },
  { line: 4, column: 5 },
  { line: 4, column: 6 },
  { line: 4, column: 7 },
  { line: 5, column: 0 },
  { line: 5, column: 1 },
  { line: 5, column: 2 },
  { line: 5, column: 3 },
  { line: 5, column: 4 },
  { line: 5, column: 5 },
  { line: 5, column: 6 },
  { line: 5, column: 7 },
]

export const MapPosicaoPecasBrancas: Map<TipoPeca, Position[]> = new Map([
  [TipoPeca.PEAO, posicaoPeoesBrancos],
  [TipoPeca.TORRE, posicaoTorresBrancas],
  [TipoPeca.CAVALO, posicaoCavalosBrancos],
  [TipoPeca.BISPO, posicaoBisposBrancos],
  [TipoPeca.RAINHA, posicaoRainha],
  [TipoPeca.REI, posicaoRei],
  [TipoPeca.VAZIO, vazios],
])

const posicaoPeoesPretos = [
  { line: 6, column: 0 },
  { line: 6, column: 1 },
  { line: 6, column: 2 },
  { line: 6, column: 3 },
  { line: 6, column: 4 },
  { line: 6, column: 5 },
  { line: 6, column: 6 },
  { line: 6, column: 7 },
]

const posicaoTorresPretos = [
  { line: 7, column: 0 },
  { line: 7, column: 7 },
]

const posicaoCavalosPretos = [
  { line: 7, column: 1 },
  { line: 7, column: 6 },
]

const posicaoBisposPretos = [
  { line: 7, column: 2 },
  { line: 7, column: 5 },
]

const posicaoRainhaPreto = [{ line: 7, column: 3 }]

const posicaoReiPreto = [{ line: 7, column: 4 }]

export const MapPosicaoPecasPretas: Map<TipoPeca, Position[]> = new Map([
  [TipoPeca.PEAO, posicaoPeoesPretos],
  [TipoPeca.TORRE, posicaoTorresPretos],
  [TipoPeca.CAVALO, posicaoCavalosPretos],
  [TipoPeca.BISPO, posicaoBisposPretos],
  [TipoPeca.RAINHA, posicaoRainhaPreto],
  [TipoPeca.REI, posicaoReiPreto],
])
