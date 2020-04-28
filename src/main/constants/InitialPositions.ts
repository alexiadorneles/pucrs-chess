import { Position } from '../definitions/Movement'
import { PieceKind } from '../definitions/PieceKind'

const whitePawnPosition: Position[] = [
  { line: 1, column: 0 },
  { line: 1, column: 1 },
  { line: 1, column: 2 },
  { line: 1, column: 3 },
  { line: 1, column: 4 },
  { line: 1, column: 5 },
  { line: 1, column: 6 },
  { line: 1, column: 7 },
]

const whiteRookPosition: Position[] = [
  { line: 0, column: 0 },
  { line: 0, column: 7 },
]

const whiteKnightPosition: Position[] = [
  { line: 0, column: 1 },
  { line: 0, column: 6 },
]

const whiteBishopPosition: Position[] = [
  { line: 0, column: 2 },
  { line: 0, column: 5 },
]

const whiteQueenPosition: Position[] = [{ line: 0, column: 3 }]

const whiteKingPosition: Position[] = [{ line: 0, column: 4 }]

const emptySpace: Position[] = [
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

export const WhitePiecesPositionMap: Map<PieceKind, Position[]> = new Map([
  [PieceKind.PAWN, whitePawnPosition],
  [PieceKind.ROOK, whiteRookPosition],
  [PieceKind.KNIGHT, whiteKnightPosition],
  [PieceKind.BISHOP, whiteBishopPosition],
  [PieceKind.QUEEN, whiteQueenPosition],
  [PieceKind.KING, whiteKingPosition],
  [PieceKind.EMPTY, emptySpace],
])

const pinkPawnPosition: Position[] = [
  { line: 6, column: 0 },
  { line: 6, column: 1 },
  { line: 6, column: 2 },
  { line: 6, column: 3 },
  { line: 6, column: 4 },
  { line: 6, column: 5 },
  { line: 6, column: 6 },
  { line: 6, column: 7 },
]

const pinkRookPosition: Position[] = [
  { line: 7, column: 0 },
  { line: 7, column: 7 },
]

const pinkKnightPosition: Position[] = [
  { line: 7, column: 1 },
  { line: 7, column: 6 },
]

const pinkBishopsPosition: Position[] = [
  { line: 7, column: 2 },
  { line: 7, column: 5 },
]

const pinkQueenPosition: Position[] = [{ line: 7, column: 3 }]

const pinkKingPosition: Position[] = [{ line: 7, column: 4 }]

export const PinkPiecesPositionMap: Map<PieceKind, Position[]> = new Map([
  [PieceKind.PAWN, pinkPawnPosition],
  [PieceKind.ROOK, pinkRookPosition],
  [PieceKind.KNIGHT, pinkKnightPosition],
  [PieceKind.BISHOP, pinkBishopsPosition],
  [PieceKind.QUEEN, pinkQueenPosition],
  [PieceKind.KING, pinkKingPosition],
])
