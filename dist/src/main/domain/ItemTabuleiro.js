"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var ItemTabuleiro = (function () {
    function ItemTabuleiro(posicao, cor) {
        var _this = this;
        this.posicao = posicao;
        this.cor = cor;
        this.onClick = function (event) {
            if (!_this.isDestacado) {
                if (_this.peca) {
                    _this.tabuleiro.setPecaEmMovimento(_this.peca);
                    _this.setDestaque(true);
                }
            }
            else {
                if (!_this.peca) {
                    if (_this.tabuleiro.isPecaEmMovimento()) {
                        _this.tabuleiro.moverPeca(_this);
                    }
                }
                else {
                    if (_this.tabuleiro.isPecaEmMovimento()) {
                        if (!lodash_1.default.isEqual(_this.peca, _this.tabuleiro.pecaEmMovimento)) {
                            _this.tabuleiro.moverPeca(_this);
                        }
                    }
                    _this.setDestaque(false);
                }
            }
        };
    }
    ItemTabuleiro.prototype.atribuirPeca = function (peca) {
        this.peca = peca;
        if (peca) {
            this.peca.adicionarAoItem(this);
        }
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
    ItemTabuleiro.prototype.getTabuleiro = function () {
        return this.tabuleiro;
    };
    ItemTabuleiro.prototype.setDestaque = function (isDestacado) {
        this.isDestacado = isDestacado;
        this.atualizarClasse();
        if (this.isDestacado) {
            if (lodash_1.default.isEqual(this.peca, this.tabuleiro.pecaEmMovimento)) {
                this.simularMovimento();
            }
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
            var posicoes = this.peca.simularMovimento();
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
