import { Peca } from "./peca/Peca";
import { Cor } from "../definitions/Cor"

export class ItemTabuleiro {
  private peca: Peca;
  private isDestacado: boolean;
  private elemento: Element;
  constructor(private linha: Number, private coluna: Number, private cor: Cor) { }

  public adicionarPeca(peca: Peca): void {
    this.peca = peca
    this.peca.adicionarAoItem(this)
  }

  public atribuirElemento(elemento: Element) {
    this.elemento = elemento
  }

  public getCor() {
    return this.cor
  }

  public getPeca() {
    return this.peca
  }
}
