"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemTabuleiro = (function () {
    function ItemTabuleiro(posicao, cor) {
        var _this = this;
        this.posicao = posicao;
        this.cor = cor;
        this.onClick = function (event) {
            _this.setDestaque(!_this.isDestacado);
        };
    }
    ItemTabuleiro.prototype.adicionarPeca = function (peca) {
        this.peca = peca;
        this.peca.adicionarAoItem(this);
    };
    ItemTabuleiro.prototype.atribuirElemento = function (elemento) {
        this.elemento = elemento;
    };
    ItemTabuleiro.prototype.adicionarAoTabuleiro = function (tabuleiro) {
        this.tabuleiro = tabuleiro;
    };
    ItemTabuleiro.prototype.getCor = function () {
        return this.cor;
    };
    ItemTabuleiro.prototype.getPeca = function () {
        return this.peca;
    };
    ItemTabuleiro.prototype.getPosicao = function () {
        return this.posicao;
    };
    ItemTabuleiro.prototype.setDestaque = function (isDestacado) {
        this.isDestacado = isDestacado;
        this.atualizarClasse();
        if (this.isDestacado) {
            this.simularMovimento();
        }
        else {
            this.removerDestaques();
        }
    };
    ItemTabuleiro.prototype.removerDestaque = function () {
        this.isDestacado = false;
        this.atualizarClasse();
    };
    ItemTabuleiro.prototype.removerDestaques = function () {
        this.tabuleiro.removerDestaques();
    };
    ItemTabuleiro.prototype.simularMovimento = function () {
        if (this.peca) {
            var posicoes = this.peca.mover();
            this.tabuleiro.destacarPosicoes(posicoes);
        }
    };
    ItemTabuleiro.prototype.atualizarClasse = function () {
        var styleClass = this.elemento.getAttribute('class');
        var jaDestacado = styleClass.includes('destaque');
        if (jaDestacado && !this.isDestacado)
            styleClass = styleClass.replace('destaque', '');
        var destaqueClass = this.isDestacado && !jaDestacado ? 'destaque' : '';
        this.elemento.setAttribute('class', styleClass + " " + destaqueClass);
    };
    return ItemTabuleiro;
}());
exports.ItemTabuleiro = ItemTabuleiro;
