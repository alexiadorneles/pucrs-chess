import { Tabuleiro } from './domain/Tabuleiro'
import { ItemTabuleiro } from './domain/ItemTabuleiro'
import { Peca } from './domain/peca/Peca'

export class DOMGenerator {
  constructor(private tabuleiro: Tabuleiro) { }

  public generate(): any {
    const root = document.getElementById('root')
    const linhas = 8
    const colunas = 8
    const elementos = []
    for (let linha = 0; linha < linhas; linha++) {
      for (let coluna = 0; coluna < colunas; coluna++) {
        const item = this.tabuleiro.getItem(linha, coluna)
        const elemento = this.criarElemento(item)
        item.atribuirElemento(elemento)
        elementos.push(elemento)
      }
    }

    elementos.forEach(elemento => root.appendChild(elemento))
  }

  private criarElemento(item: ItemTabuleiro): Element {
    const div = document.createElement('div')
    const quadrado = document.createElement('span')
    quadrado.setAttribute('class', `fas fa-square-full xadrez-quadrado-${item.getCor()}`)

    const iconePeca = this.criarIconePeca(item.getPeca())

    quadrado.appendChild(iconePeca)
    div.appendChild(quadrado)

    return div
  }

  private criarIconePeca(peca: Peca | undefined): Element {
    const tipoPeca = peca && peca.getTipo() || ''
    const corPeca = peca && peca.getCor() || ''

    const iconePeca = document.createElement('i')
    iconePeca.setAttribute('class', `fas fa-${tipoPeca} peca-${corPeca}`)
    return iconePeca
  }
}
