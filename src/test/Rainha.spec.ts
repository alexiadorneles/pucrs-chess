import chai from 'chai'
import _ from 'lodash'
import 'mocha'
import sinon from 'sinon'
import { Cor } from '../main/definitions/Cor'
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
      const rainha = new Rainha(Cor.BRANCAS)
      const item = new ItemTabuleiro({ linha: 0, coluna: 0 }, Cor.PRETAS)
      // act
      rainha.adicionarAoItem(item)
      // assert
      expect(rainha.getItemTabuleiro()).to.deep.equals(item)
    })
  })
  describe('ao chamar simularMovimento', () => {
    it('quando posição inicial e tabuleiro limpo deve retornar muitas opções ', () => {
      // arrange
      const tabuleiro = new Tabuleiro()
      sinon.replace(tabuleiro, 'getItem', (posicao) => new ItemTabuleiro(posicao, Cor.BRANCAS))
      const rainha = new Rainha(Cor.BRANCAS)
      const item = new ItemTabuleiro({ linha: 0, coluna: 3 }, Cor.PRETAS)
      item.atribuirPeca(rainha)
      tabuleiro.adicionarItem(item)
      // act
      const esperado = [
        // horizontal
        { linha: 0, coluna: 0 },
        { linha: 0, coluna: 1 },
        { linha: 0, coluna: 2 },
        { linha: 0, coluna: 4 },
        { linha: 0, coluna: 5 },
        { linha: 0, coluna: 6 },
        { linha: 0, coluna: 7 },
        // vertical
        { linha: 1, coluna: 3 },
        { linha: 2, coluna: 3 },
        { linha: 3, coluna: 3 },
        { linha: 4, coluna: 3 },
        { linha: 5, coluna: 3 },
        { linha: 6, coluna: 3 },
        { linha: 7, coluna: 3 },
        // diagonal esquerda
        { linha: 1, coluna: 2 },
        { linha: 2, coluna: 1 },
        { linha: 3, coluna: 0 },
        // diagonal direita
        { linha: 1, coluna: 4 },
        { linha: 2, coluna: 5 },
        { linha: 3, coluna: 6 },
        { linha: 4, coluna: 7 },
      ]
      const resultado = rainha.simularMovimento()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
      sinon.restore()
    })
    it('quando caminho livre deve retornar todos possíveis', () => {
      // arrange
      const tabuleiro = new Tabuleiro()
      sinon.replace(tabuleiro, 'getItem', (posicao) => new ItemTabuleiro(posicao, Cor.BRANCAS))
      const rainha = new Rainha(Cor.BRANCAS)
      const item = new ItemTabuleiro({ linha: 3, coluna: 3 }, Cor.PRETAS)
      item.atribuirPeca(rainha)
      tabuleiro.adicionarItem(item)
      // act
      const esperado = [
        // vertical - atrás
        { linha: 2, coluna: 3 },
        { linha: 1, coluna: 3 },
        { linha: 0, coluna: 3 },
        // vertical - frente
        { linha: 4, coluna: 3 },
        { linha: 5, coluna: 3 },
        { linha: 6, coluna: 3 },
        { linha: 7, coluna: 3 },
        // horizontal - esquerda
        { linha: 3, coluna: 2 },
        { linha: 3, coluna: 1 },
        { linha: 3, coluna: 0 },
        // horizontal - direita
        { linha: 3, coluna: 4 },
        { linha: 3, coluna: 5 },
        { linha: 3, coluna: 6 },
        { linha: 3, coluna: 7 },
        // diagonal - atrás - esuqerda
        { linha: 2, coluna: 2 },
        { linha: 1, coluna: 1 },
        { linha: 0, coluna: 0 },
        // diagonal - atrás - direita
        { linha: 2, coluna: 4 },
        { linha: 1, coluna: 5 },
        { linha: 0, coluna: 6 },
        // diagonal - frente - esuqerda
        { linha: 4, coluna: 2 },
        { linha: 5, coluna: 1 },
        { linha: 6, coluna: 0 },
        // diagonal - frente - direita
        { linha: 4, coluna: 4 },
        { linha: 5, coluna: 5 },
        { linha: 6, coluna: 6 },
        { linha: 7, coluna: 7 },
      ]
      const resultado = rainha.simularMovimento()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
      sinon.restore()
    })
    it('quando peças no caminho retorna apenas posições válidas', () => {
      // arrange
      const rainha = new Rainha(Cor.BRANCAS)
      const itemRainha = new ItemTabuleiro({ linha: 2, coluna: 2 }, Cor.PRETAS)
      itemRainha.atribuirPeca(rainha)

      const peao = new Peao(Cor.BRANCAS)
      const itemPeao = new ItemTabuleiro({ linha: 2, coluna: 1 }, Cor.PRETAS)
      itemPeao.atribuirPeca(peao)

      const peao2 = new Peao(Cor.BRANCAS)
      const itemPeao2 = new ItemTabuleiro({ linha: 3, coluna: 3 }, Cor.PRETAS)
      itemPeao2.atribuirPeca(peao2)

      const peao3 = new Peao(Cor.BRANCAS)
      const itemPeao3 = new ItemTabuleiro({ linha: 2, coluna: 4 }, Cor.PRETAS)
      itemPeao3.atribuirPeca(peao3)

      const peao4 = new Peao(Cor.BRANCAS)
      const itemPeao4 = new ItemTabuleiro({ linha: 1, coluna: 2 }, Cor.PRETAS)
      itemPeao4.atribuirPeca(peao4)

      const torre = new Torre(Cor.BRANCAS)
      const itemTorre = new ItemTabuleiro({ linha: 0, coluna: 0 }, Cor.PRETAS)
      itemTorre.atribuirPeca(torre)

      const rei = new Rei(Cor.BRANCAS)
      const itemRei = new ItemTabuleiro({ linha: 0, coluna: 4 }, Cor.PRETAS)
      itemRei.atribuirPeca(rei)

      const peaoOponente = new Peao(Cor.BRANCAS)
      const itemPeaoOponente = new ItemTabuleiro({ linha: 6, coluna: 2 }, Cor.BRANCAS)
      itemPeaoOponente.atribuirPeca(peaoOponente)

      const itens = [itemRainha, itemPeao, itemPeao2, itemPeao3, itemPeao4, itemPeaoOponente, itemTorre, itemRei]

      sinon.replace(Tabuleiro.prototype, 'getItem', (posicao) => {
        const item = itens.find(item => _.isEqual(item.getPosicao(), posicao))
        return item || new ItemTabuleiro(posicao, Cor.BRANCAS)
      })
      const tabuleiro = new Tabuleiro()
      itens.forEach(item => tabuleiro.adicionarItem(item))
      // act
      const esperado = [
        { linha: 1, coluna: 1 },
        { linha: 1, coluna: 3 },
        { linha: 2, coluna: 3 },
        { linha: 3, coluna: 1 },
        { linha: 3, coluna: 2 },
        { linha: 4, coluna: 0 },
        { linha: 4, coluna: 2 },
        { linha: 5, coluna: 2 },
      ]
      const resultado = rainha.simularMovimento()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
      sinon.restore()
    })
  })
})
