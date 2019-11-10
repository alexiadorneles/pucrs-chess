import { Peca } from "./peca/Peca";
import { Cor } from "../definitions/Cor"
import { Posicao } from "../definitions/Movimento";
import { Tabuleiro } from "domain/Tabuleiro";

export class ItemTabuleiro {
  private peca: Peca;
  private isDestacado: boolean;
  private elemento: Element;
  private tabuleiro: Tabuleiro;
  constructor(private linha: number, private coluna: number, private cor: Cor) { }

  public adicionarPeca(peca: Peca): void {
    this.peca = peca
    this.peca.adicionarAoItem(this)
  }

  public atribuirElemento(elemento: Element) {
    this.elemento = elemento
  }

  public adicionarAoTabuleiro(tabuleiro: Tabuleiro) {
    this.tabuleiro = tabuleiro
  }

  public onClick = (event: Event) => {
    this.setDestaque(!this.isDestacado)
  }

  public getCor() {
    return this.cor
  }

  public getPeca() {
    return this.peca
  }

  public getPosicao(): Posicao {
    const { linha, coluna } = this
    return { linha, coluna }
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
      const posicoes = this.peca.mover()
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
