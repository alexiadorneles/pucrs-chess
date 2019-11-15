"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var Peca = (function () {
    function Peca(tipo, cor, movimentos, vaiPraTras) {
        this.calculatePossibleMoviment = function (_a, tabuleiro, tipoMovimento) {
            var linha = _a.linha, coluna = _a.coluna;
            var moviments = [];
            var movimentoColuna;
            var movimentoLinha;
            if (tipoMovimento == 0) {
                var hasPiece = false;
                movimentoColuna = coluna + 1;
                while (!hasPiece) {
                    var nextMoviment = { linha: linha, coluna: movimentoColuna };
                    hasPiece = tabuleiro.isPosicaoOcupada(nextMoviment);
                    if (!hasPiece) {
                        moviments.push(nextMoviment);
                    }
                    if (movimentoColuna >= 7)
                        break;
                    else
                        movimentoColuna = movimentoColuna + 1;
                }
                hasPiece = false;
                movimentoColuna = coluna - 1;
                while (!hasPiece) {
                    var nextMoviment = { linha: linha, coluna: movimentoColuna };
                    hasPiece = tabuleiro.isPosicaoOcupada({ linha: linha, coluna: movimentoColuna });
                    if (!hasPiece) {
                        moviments.push(nextMoviment);
                    }
                    if (movimentoColuna <= 0)
                        break;
                    else
                        movimentoColuna = movimentoColuna - 1;
                }
                return moviments;
            }
            else if (tipoMovimento == 1) {
                var hasPiece = false;
                movimentoLinha = linha + 1;
                while (!hasPiece) {
                    var nextMoviment = { linha: movimentoLinha, coluna: coluna };
                    hasPiece = tabuleiro.isPosicaoOcupada(nextMoviment);
                    if (!hasPiece) {
                        moviments.push(nextMoviment);
                    }
                    if (movimentoLinha >= 7)
                        break;
                    else
                        movimentoLinha = movimentoLinha + 1;
                }
                hasPiece = false;
                movimentoLinha = linha - 1;
                while (!hasPiece) {
                    var nextMoviment = { linha: movimentoLinha, coluna: coluna };
                    hasPiece = tabuleiro.isPosicaoOcupada(nextMoviment);
                    if (!hasPiece) {
                        moviments.push(nextMoviment);
                    }
                    if (movimentoLinha <= 0)
                        break;
                    else
                        movimentoLinha = movimentoLinha - 1;
                }
                return moviments;
            }
            else {
                var hasPiece = false;
                movimentoLinha = linha + 1;
                movimentoColuna = coluna - 1;
                while (!hasPiece) {
                    var nextMoviment = { linha: movimentoLinha, coluna: movimentoColuna };
                    hasPiece = tabuleiro.isPosicaoOcupada(nextMoviment);
                    if (!hasPiece) {
                        moviments.push(nextMoviment);
                    }
                    if (movimentoLinha >= 7 || movimentoColuna <= 0)
                        break;
                    else {
                        movimentoLinha = movimentoLinha + 1;
                        movimentoColuna = movimentoColuna - 1;
                    }
                }
                hasPiece = false;
                movimentoLinha = linha - 1;
                movimentoColuna = coluna + 1;
                while (!hasPiece) {
                    var nextMoviment = { linha: movimentoLinha, coluna: movimentoColuna };
                    hasPiece = tabuleiro.isPosicaoOcupada(nextMoviment);
                    if (!hasPiece) {
                        moviments.push(nextMoviment);
                    }
                    if (movimentoLinha <= 0 || movimentoColuna >= 7)
                        break;
                    else {
                        movimentoLinha = movimentoLinha - 1;
                        movimentoColuna = movimentoColuna + 1;
                    }
                }
                hasPiece = false;
                movimentoLinha = linha + 1;
                movimentoColuna = coluna + 1;
                while (!hasPiece) {
                    var nextMoviment = { linha: movimentoLinha, coluna: movimentoColuna };
                    hasPiece = tabuleiro.isPosicaoOcupada(nextMoviment);
                    if (!hasPiece) {
                        moviments.push(nextMoviment);
                    }
                    if (movimentoLinha >= 7 || movimentoColuna >= 7)
                        break;
                    else {
                        movimentoLinha = movimentoLinha + 1;
                        movimentoColuna = movimentoColuna + 1;
                    }
                }
                hasPiece = false;
                movimentoLinha = linha - 1;
                movimentoColuna = coluna - 1;
                while (!hasPiece) {
                    var nextMoviment = { linha: movimentoLinha, coluna: movimentoColuna };
                    hasPiece = tabuleiro.isPosicaoOcupada(nextMoviment);
                    if (!hasPiece) {
                        moviments.push(nextMoviment);
                    }
                    if (movimentoLinha <= 0 || movimentoColuna <= 0)
                        break;
                    else {
                        movimentoLinha = movimentoLinha - 1;
                        movimentoColuna = movimentoColuna - 1;
                    }
                }
                return moviments;
            }
        };
        this.tipo = tipo;
        this.cor = cor;
        this.movimentos = movimentos;
        this.vaiPraTras = vaiPraTras;
    }
    Peca.prototype.isVaiPraTras = function () {
        return this.vaiPraTras;
    };
    Peca.prototype.getItemTabuleiro = function () {
        return this.itemTabuleiro;
    };
    Peca.prototype.podeMover = function (posicao, ocupada) {
        var isPosicaoOcupadaPorEstaPeca = lodash_1.default.isEqual(posicao, this.getItemTabuleiro().getPosicao());
        return ocupada ? isPosicaoOcupadaPorEstaPeca : true;
    };
    Peca.prototype.simularMovimento = function (tabuleiro) {
        var _this = this;
        return lodash_1.default.flatten(this.movimentos.map(function (moviment) {
            return _this.calculatePossibleMoviment(_this.getItemTabuleiro().getPosicao(), tabuleiro, moviment.getTipo());
        }));
    };
    Peca.prototype.adicionarAoItem = function (item) {
        this.itemTabuleiro = item;
    };
    Peca.prototype.getCor = function () {
        return this.cor;
    };
    Peca.prototype.getTipo = function () {
        return this.tipo;
    };
    return Peca;
}());
exports.Peca = Peca;
