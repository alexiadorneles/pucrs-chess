import { Tabuleiro } from './domain/Tabuleiro'
import { ItemTabuleiro } from './domain/ItemTabuleiro'
import { Peca } from './domain/peca/Peca'

export class DOMGenerator {
  private static instance: DOMGenerator
  private tabuleiro: Tabuleiro

  private constructor() {
  }

  public injetarTabuleiro(tabuleiro: Tabuleiro): void {
    this.tabuleiro = tabuleiro
  }

  public getTabuleiro(): Tabuleiro {
    return this.tabuleiro
  }

  static getInstance(): DOMGenerator {
    if (!DOMGenerator.instance) {
      DOMGenerator.instance = new DOMGenerator()
    }

    return DOMGenerator.instance
  }

  public refresh(): any {
    const root = document.getElementById('root')
    root.innerHTML = ''
    const linhas = 8
    const colunas = 8
    const elementosLinha = []
    let elementosColuna = []
    for (let linha = 0; linha < linhas; linha++) {
      elementosColuna = []

      for (let coluna = 0; coluna < colunas; coluna++) {
        const item = this.tabuleiro.getItem({ linha, coluna })
        const elemento = this.criarElemento(item)
        elementosColuna.push(elemento)
      }

      const elementoLinha = document.createElement('div')
      elementoLinha.setAttribute('class', 'xadrez-linha')
      elementosColuna.forEach((elementoColuna => elementoLinha.appendChild(elementoColuna)))
      elementosLinha.push(elementoLinha)
    }


    elementosLinha.forEach(elemento => root.appendChild(elemento))
  }

  private criarElemento(item: ItemTabuleiro): Element {
    const div = document.createElement('div')
    div.setAttribute('class', 'container')

    const quadrado = document.createElement('span')
    quadrado.setAttribute('class', `fas fa-square-full xadrez-quadrado ${item.getCor()}`)
    quadrado.addEventListener('click', item.onClick)
    item.atribuirElemento(quadrado)

    const iconePeca = this.criarIconePeca(item.getPeca())

    div.appendChild(iconePeca)
    div.appendChild(quadrado)

    return div
  }

  private criarIconePeca(peca: Peca | undefined): Element {
    const tipoPeca = peca && peca.getTipo() || ''
    const corPeca = peca && peca.getCor() || ''

    const iconePeca = document.createElement('i')
    iconePeca.setAttribute('class', `fas fa-${tipoPeca} peca ${corPeca}`)
    return iconePeca
  }
}
