import { Tabuleiro } from './domain/Tabuleiro'
import { DOMGenerator } from './DOMGenerator'

const tabuleiroInicial = new Tabuleiro().gerarTabuleiroInicial()
DOMGenerator.getInstance().injetarTabuleiro(tabuleiroInicial)
DOMGenerator.getInstance().refresh()
