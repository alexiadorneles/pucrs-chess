import { Peca } from "./peca/Peca";
import { Cor } from "../definitions/Cor"
import { Posicao } from "../definitions/Movimento";
import { Tabuleiro } from "../domain/Tabuleiro";
import { DOMGenerator } from "../DOMGenerator";

export class ItemTabuleiro {
  private peca: Peca
  private isDestacado: boolean
  private elemento: Element
  private tabuleiro: Tabuleiro
  constructor(private posicao: Posicao, private cor: Cor) { }

  public atribuirPeca(peca: Peca): void {
    this.peca = peca
    if (peca) {
      this.peca.adicionarAoItem(this)
    }
  }

  public atribuirElemento(elemento: Element) {
    this.elemento = elemento
  }

  public adicionarAoTabuleiro(tabuleiro: Tabuleiro) {
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
        this.setDestaque(false)
      }
    }
  }

  public getCor() {
    return this.cor
  }

  public getPeca() {
    return this.peca
  }

  public getPosicao(): Posicao {
    return this.posicao
  }

  public setDestaque(isDestacado: boolean) {
    this.isDestacado = isDestacado
    this.atualizarClasse()
    if (this.isDestacado) {
      this.simularMovimento()
    } else {
      this.removerDestaques()
    }
  }

  public removerDestaque() {
    this.isDestacado = false
    this.atualizarClasse()
  }

  private removerDestaques(): void {
    this.tabuleiro.removerDestaques()
  }

  private simularMovimento(): void {
    if (this.peca) {
      const posicoes = this.peca.simularMovimento()
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
