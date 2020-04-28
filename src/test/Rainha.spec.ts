import chai from 'chai'
import _ from 'lodash'
import 'mocha'
import sinon from 'sinon'
import { Color } from '../main/definitions/Color'
import { ItemTabuleiro } from '../main/domain/ItemTabuleiro'
import { Peao } from '../main/domain/peca/Peao'
import { Rainha } from '../main/domain/peca/Rainha'
import { Tabuleiro } from '../main/domain/Tabuleiro'
import deepEqualInAnyOrder = require('deep-equal-in-any-order')
import { Rei } from '../main/domain/peca/Rei'
import { Torre } from '../main/domain/peca/Torre'

chai.use(deepEqualInAnyOrder)
const expect = chai.expect

context('Rainha', () => {
  describe('ao chamar adicionarAoItem', () => {
    it('deve atribuir propriedade item', () => {
      // arrange
      const rainha = new Rainha(Color.WHITE)
      const item = new ItemTabuleiro({ line: 0, column: 0 }, Color.BLACK)
      // act
      rainha.adicionarAoItem(item)
      // assert
      expect(rainha.getItemTabuleiro()).to.deep.equals(item)
    })
  })
  describe('ao chamar simularMovimento', () => {
    beforeEach(() => sinon.restore())
    it('quando posição inicial e tabuleiro limpo deve retornar muitas opções ', () => {
      // arrange
      const tabuleiro = new Tabuleiro()
      const rainha = new Rainha(Color.WHITE)
      const posicaoRainha = { line: 0, column: 3 }
      const item = new ItemTabuleiro(posicaoRainha, Color.BLACK)
      item.atribuirPeca(rainha)
      sinon.replace(tabuleiro, 'getItem', (posicao) => {
        return _.isEqual(posicaoRainha, posicao) ? item : new ItemTabuleiro(posicao, Color.WHITE)
      })
      tabuleiro.adicionarItem(item)
      // act
      const esperado = [
        // horizontal
        { line: 0, column: 0 },
        { line: 0, column: 1 },
        { line: 0, column: 2 },
        { line: 0, column: 4 },
        { line: 0, column: 5 },
        { line: 0, column: 6 },
        { line: 0, column: 7 },
        // vertical
        { line: 1, column: 3 },
        { line: 2, column: 3 },
        { line: 3, column: 3 },
        { line: 4, column: 3 },
        { line: 5, column: 3 },
        { line: 6, column: 3 },
        { line: 7, column: 3 },
        // diagonal esquerda
        { line: 1, column: 2 },
        { line: 2, column: 1 },
        { line: 3, column: 0 },
        // diagonal direita
        { line: 1, column: 4 },
        { line: 2, column: 5 },
        { line: 3, column: 6 },
        { line: 4, column: 7 },
      ]
      const resultado = rainha.simularMovimento()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
      sinon.restore()
    })
    it('quando caminho livre deve retornar todos possíveis', () => {
      // arrange
      const tabuleiro = new Tabuleiro()
      const posicaoRainha = { line: 3, column: 3 }
      const rainha = new Rainha(Color.WHITE)
      const item = new ItemTabuleiro(posicaoRainha, Color.BLACK)
      item.atribuirPeca(rainha)
      sinon.replace(tabuleiro, 'getItem', (posicao) => {
        return _.isEqual(posicaoRainha, posicao) ? item : new ItemTabuleiro(posicao, Color.WHITE)
      })
      tabuleiro.adicionarItem(item)
      // act
      const esperado = [
        // vertical - atrás
        { line: 2, column: 3 },
        { line: 1, column: 3 },
        { line: 0, column: 3 },
        // vertical - frente
        { line: 4, column: 3 },
        { line: 5, column: 3 },
        { line: 6, column: 3 },
        { line: 7, column: 3 },
        // horizontal - esquerda
        { line: 3, column: 2 },
        { line: 3, column: 1 },
        { line: 3, column: 0 },
        // horizontal - direita
        { line: 3, column: 4 },
        { line: 3, column: 5 },
        { line: 3, column: 6 },
        { line: 3, column: 7 },
        // diagonal - atrás - esuqerda
        { line: 2, column: 2 },
        { line: 1, column: 1 },
        { line: 0, column: 0 },
        // diagonal - atrás - direita
        { line: 2, column: 4 },
        { line: 1, column: 5 },
        { line: 0, column: 6 },
        // diagonal - frente - esuqerda
        { line: 4, column: 2 },
        { line: 5, column: 1 },
        { line: 6, column: 0 },
        // diagonal - frente - direita
        { line: 4, column: 4 },
        { line: 5, column: 5 },
        { line: 6, column: 6 },
        { line: 7, column: 7 },
      ]
      const resultado = rainha.simularMovimento()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
      sinon.restore()
    })
    it('quando peças no caminho retorna apenas posições válidas', () => {
      // arrange
      const rainha = new Rainha(Color.WHITE)
      const itemRainha = new ItemTabuleiro({ line: 2, column: 2 }, Color.BLACK)
      itemRainha.atribuirPeca(rainha)

      const peao = new Peao(Color.WHITE)
      const itemPeao = new ItemTabuleiro({ line: 2, column: 1 }, Color.BLACK)
      itemPeao.atribuirPeca(peao)

      const peao2 = new Peao(Color.WHITE)
      const itemPeao2 = new ItemTabuleiro({ line: 3, column: 3 }, Color.BLACK)
      itemPeao2.atribuirPeca(peao2)

      const peao3 = new Peao(Color.WHITE)
      const itemPeao3 = new ItemTabuleiro({ line: 2, column: 4 }, Color.BLACK)
      itemPeao3.atribuirPeca(peao3)

      const peao4 = new Peao(Color.WHITE)
      const itemPeao4 = new ItemTabuleiro({ line: 1, column: 2 }, Color.BLACK)
      itemPeao4.atribuirPeca(peao4)

      const torre = new Torre(Color.WHITE)
      const itemTorre = new ItemTabuleiro({ line: 0, column: 0 }, Color.BLACK)
      itemTorre.atribuirPeca(torre)

      const rei = new Rei(Color.WHITE)
      const itemRei = new ItemTabuleiro({ line: 0, column: 4 }, Color.BLACK)
      itemRei.atribuirPeca(rei)

      const peaoOponente = new Peao(Color.WHITE)
      const itemPeaoOponente = new ItemTabuleiro({ line: 6, column: 2 }, Color.WHITE)
      itemPeaoOponente.atribuirPeca(peaoOponente)

      const itens = [itemRainha, itemPeao, itemPeao2, itemPeao3, itemPeao4, itemPeaoOponente, itemTorre, itemRei]

      sinon.replace(Tabuleiro.prototype, 'getItem', (posicao) => {
        const item = itens.find(item => _.isEqual(item.getPosicao(), posicao))
        return item || new ItemTabuleiro(posicao, Color.WHITE)
      })
      const tabuleiro = new Tabuleiro()
      itens.forEach(item => tabuleiro.adicionarItem(item))
      // act
      const esperado = [
        { line: 1, column: 1 },
        { line: 1, column: 3 },
        { line: 2, column: 3 },
        { line: 3, column: 1 },
        { line: 3, column: 2 },
        { line: 4, column: 0 },
        { line: 4, column: 2 },
        { line: 5, column: 2 },
      ]
      const resultado = rainha.simularMovimento()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
      sinon.restore()
    })
  })
})
