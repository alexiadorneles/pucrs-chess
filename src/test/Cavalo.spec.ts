import chai from 'chai'
import 'mocha'
import sinon from 'sinon'
import { Color } from '../main/definitions/Color'
import { ItemTabuleiro } from '../main/domain/ItemTabuleiro'
import { Cavalo } from '../main/domain/peca/Cavalo'
import { Peao } from '../main/domain/peca/Peao'
import { Rainha } from '../main/domain/peca/Rainha'
import { Tabuleiro } from '../main/domain/Tabuleiro'
import deepEqualInAnyOrder = require('deep-equal-in-any-order')
import _ from 'lodash'

chai.use(deepEqualInAnyOrder)
const expect = chai.expect

context('Cavalo', () => {
  describe('ao chamar adicionarAoItem', () => {
    it('deve atribuir propriedade item', () => {
      // arrange
      const cavalo = new Cavalo(Color.WHITE)
      const item = new ItemTabuleiro({ line: 0, column: 0 }, Color.BLACK)
      // act
      cavalo.adicionarAoItem(item)
      // assert
      expect(cavalo.getItemTabuleiro()).to.deep.equals(item)
    })
  })
  describe('ao chamar simularMovimento', () => {
    it('quando posição atual e tabuleiro limpo deve retornar três opções ', () => {
      // arrange
      const tabuleiro = new Tabuleiro()
      sinon.replace(tabuleiro, 'getItem', (posicao) => new ItemTabuleiro(posicao, Color.WHITE))
      const cavalo = new Cavalo(Color.WHITE)
      const item = new ItemTabuleiro({ line: 0, column: 1 }, Color.BLACK)
      item.atribuirPeca(cavalo)
      tabuleiro.adicionarItem(item)
      // act
      const esperado = [
        { linha: 1, coluna: 3 },
        { linha: 2, coluna: 2 },
        { linha: 2, coluna: 0 }
      ]
      const resultado = cavalo.simularMovimento()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
    })
    it('quando caminho livre deve retornar todos possíveis', () => {
      // arrange
      const tabuleiro = new Tabuleiro()
      sinon.replace(tabuleiro, 'getItem', (posicao) => new ItemTabuleiro(posicao, Color.WHITE))
      const cavalo = new Cavalo(Color.WHITE)
      const item = new ItemTabuleiro({ line: 2, column: 2 }, Color.BLACK)
      item.atribuirPeca(cavalo)
      tabuleiro.adicionarItem(item)
      // act
      const esperado = [
        { linha: 0, coluna: 1 },
        { linha: 0, coluna: 3 },
        { linha: 1, coluna: 0 },
        { linha: 1, coluna: 4 },
        { linha: 3, coluna: 0 },
        { linha: 3, coluna: 4 },
        { linha: 4, coluna: 1 },
        { linha: 4, coluna: 3 },
      ]
      const resultado = cavalo.simularMovimento()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
    })
    it('quando peças no caminho retorna apenas posições válidas', () => {
      // arrange
      const cavalo = new Cavalo(Color.WHITE)
      const itemCavalo = new ItemTabuleiro({ line: 2, column: 2 }, Color.BLACK)
      itemCavalo.atribuirPeca(cavalo)

      const rainha = new Rainha(Color.WHITE)
      const itemRainha = new ItemTabuleiro({ line: 0, column: 3 }, Color.BLACK)
      itemRainha.atribuirPeca(rainha)

      const peao = new Peao(Color.WHITE)
      const itemPeao = new ItemTabuleiro({ line: 1, column: 0 }, Color.BLACK)
      itemPeao.atribuirPeca(peao)

      const peao2 = new Peao(Color.WHITE)
      const itemPeao2 = new ItemTabuleiro({ line: 1, column: 4 }, Color.BLACK)
      itemPeao2.atribuirPeca(peao2)

      sinon.replace(Tabuleiro.prototype, 'getItem', (posicao) => {
        const itens = [itemCavalo, itemRainha, itemPeao, itemPeao2]
        const item = itens.find(item => _.isEqual(item.getPosicao(), posicao))
        return item || new ItemTabuleiro(posicao, Color.WHITE)
      })
      const tabuleiro = new Tabuleiro()

      tabuleiro.adicionarItem(itemCavalo)
      tabuleiro.adicionarItem(itemPeao)
      tabuleiro.adicionarItem(itemPeao2)
      tabuleiro.adicionarItem(itemRainha)

      // act
      const esperado = [
        { linha: 0, coluna: 1 },
        { linha: 3, coluna: 0 },
        { linha: 3, coluna: 4 },
        { linha: 4, coluna: 1 },
        { linha: 4, coluna: 3 },
      ]
      const resultado = cavalo.simularMovimento()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
    })
  })
})
