import _ from 'lodash'
import { Color } from '../definitions/Color'
import { Position } from '../definitions/Movement'
import { Piece } from './piece/Piece'
import { Tabuleiro } from './Tabuleiro'

export class ItemTabuleiro {
  private peca: Piece
  private isDestacado: boolean
  private elemento: Element
  private tabuleiro: Tabuleiro
  constructor(private posicao: Position, private cor: Color) { }

  public atribuirPeca(peca: Piece): void {
    this.peca = peca
    if (peca) {
      this.peca.addToItem(this)
    }
  }

  public atribuirElemento(elemento: Element): void {
    this.elemento = elemento
  }

  public adicionarAoTabuleiro(tabuleiro: Tabuleiro): void {
    this.tabuleiro = tabuleiro
  }

  public setTabuleiro(tabuleiro: Tabuleiro): void {
    this.tabuleiro = tabuleiro
  }

  public onClick = (event: Event) => {
    if (!this.isDestacado) {
      if (this.peca) {
        this.tabuleiro.setPecaEmMovimento(this.peca)
        this.setDestaque(true)
      }
    } else {
      if (!this.peca) {
        if (this.tabuleiro.isPecaEmMovimento()) {
          this.tabuleiro.moverPeca(this)
        }
      } else {
        if (this.tabuleiro.isPecaEmMovimento()) {
          if (!_.isEqual(this.peca, this.tabuleiro.pecaEmMovimento)) {
            this.tabuleiro.moverPeca(this)
          }
        }
        this.setDestaque(false)
      }
    }
  }

  public getCor(): Color {
    return this.cor
  }

  public getPeca(): Piece {
    return this.peca
  }

  public getPosicao(): Position {
    return this.posicao
  }

  public getTabuleiro(): Tabuleiro {
    return this.tabuleiro
  }

  public setDestaque(isDestacado: boolean): void {
    this.isDestacado = isDestacado
    this.atualizarClasse()
    if (this.isDestacado) {
      if (_.isEqual(this.peca, this.tabuleiro.pecaEmMovimento)) {
        this.simularMovimento()
      }
    } else {
      this.removerDestaques()
    }
  }

  public removerDestaque(): void {
    this.isDestacado = false
    this.atualizarClasse()
  }

  private removerDestaques(): void {
    this.tabuleiro.removerDestaques()
  }

  private simularMovimento(): void {
    if (this.peca) {
      const posicoes = this.peca.simulateMovement()
      this.tabuleiro.destacarPosicoes(posicoes)
    }
  }

  private atualizarClasse(): void {
    let styleClass = this.elemento.getAttribute('class')
    const jaDestacado = styleClass.includes('destaque')
    if (jaDestacado && !this.isDestacado) styleClass = styleClass.replace('destaque', '')
    const destaqueClass = this.isDestacado && !jaDestacado ? 'destaque' : ''
    this.elemento.setAttribute('class', `${styleClass} ${destaqueClass}`)
  }
}
