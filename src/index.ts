import { DOMGenerator } from "./DOMGenerator"
import { Tabuleiro } from "./domain/Tabuleiro"

const tabuleiro = new Tabuleiro()
tabuleiro.gerarTabuleiroInicial()
new DOMGenerator(tabuleiro).generate()
