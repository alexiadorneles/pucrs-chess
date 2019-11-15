import { expect } from 'chai'
import 'mocha'
import { Cor } from '../main/definitions/Cor'
import { ItemTabuleiro } from '../main/domain/ItemTabuleiro'
import { Peao } from '../main/domain/peca/Peao'

context('Peao', () => {
  describe('ao chamar adicionarAoItem', () => {
    it('deve atribuir propriedade item', () => {
      // arrange
      const peao = new Peao(Cor.BRANCAS)
      const item = new ItemTabuleiro({ linha: 0, coluna: 0 }, Cor.PRETAS)
      // act
      peao.adicionarAoItem(item)
      // assert
      expect(peao.getItemTabuleiro()).to.deep.equals(item)
    })
  })
  describe('ao chamar simularMovimento', () => {
    it('quando caminho livre deve retornar posição atual e uma para frente', () => {
      // arrange
      const peao = new Peao(Cor.BRANCAS)
      const item = new ItemTabuleiro({ linha: 1, coluna: 2 }, Cor.PRETAS)
      item.atribuirPeca(peao)
      // act
      const esperado = [{ linha: 2, coluna: 2 }]
      const resultado = peao.simularMovimento()
      // assert
      expect(resultado).to.deep.equals(esperado)
    })
    it('quando caminho livre deve retornar posição atual e uma para frente', () => {
      // arrange
      const peao = new Peao(Cor.BRANCAS)
      const item = new ItemTabuleiro({ linha: 1, coluna: 2 }, Cor.PRETAS)
      item.atribuirPeca(peao)
      // act
      const esperado = [{ linha: 2, coluna: 2 }]
      const resultado = peao.simularMovimento()
      // assert
      expect(resultado).to.deep.equals(esperado)
    })
  })
})
