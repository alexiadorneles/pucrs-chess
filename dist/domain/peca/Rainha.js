"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Peca_1 = require("./Peca");
var TipoPeca_1 = require("../../definitions/TipoPeca");
var MovimentoVertical_1 = require("../movimento/MovimentoVertical");
var MovimentoHorizontal_1 = require("../movimento/MovimentoHorizontal");
var MovimentoDiagonal_1 = require("../movimento/MovimentoDiagonal");
var ExtensorPosicoes_1 = require("../../ExtensorPosicoes");
var lodash_1 = __importDefault(require("lodash"));
var calculatePossibleMoviment = function (posicao, table, movimentStyle) {
    var x = posicao.linha;
    var y = posicao.coluna;
    var moviments = [];
    var yMove;
    var xMove;
    if (movimentStyle == 0) {
        var hasPiece = false;
        yMove = y + 1;
        while (!hasPiece) {
            var nextMoviment = [x, yMove];
            hasPiece = table.isPosicaoOcupada({ linha: x, coluna: yMove });
            moviments.push(nextMoviment);
            if (yMove >= 7)
                break;
            else
                yMove = yMove + 1;
        }
        hasPiece = false;
        yMove = y - 1;
        while (!hasPiece) {
            var nextMoviment = [x, yMove];
            hasPiece = table.isPosicaoOcupada({ linha: x, coluna: yMove });
            moviments.push(nextMoviment);
            if (yMove <= 0)
                break;
            else
                yMove = yMove - 1;
        }
        return moviments;
    }
    else if (movimentStyle == 1) {
        var hasPiece = false;
        xMove = x + 1;
        while (!hasPiece) {
            var nextMoviment = [xMove, y];
            hasPiece = table.isPosicaoOcupada({ linha: xMove, coluna: y });
            moviments.push(nextMoviment);
            if (xMove >= 7)
                break;
            else
                xMove = xMove + 1;
        }
        hasPiece = false;
        xMove = x - 1;
        while (!hasPiece) {
            var nextMoviment = [xMove, y];
            hasPiece = table.isPosicaoOcupada({ linha: xMove, coluna: y });
            moviments.push(nextMoviment);
            if (xMove <= 0)
                break;
            else
                xMove = xMove - 1;
        }
        return moviments;
    }
    else {
        var hasPiece = false;
        xMove = x + 1;
        yMove = y - 1;
        while (!hasPiece) {
            var nextMoviment = [xMove, yMove];
            hasPiece = table.isPosicaoOcupada({ linha: xMove, coluna: yMove });
            moviments.push(nextMoviment);
            if (xMove >= 7 || yMove <= 0)
                break;
            else {
                xMove = xMove + 1;
                yMove = yMove - 1;
            }
        }
        hasPiece = false;
        xMove = x - 1;
        yMove = y + 1;
        while (!hasPiece) {
            var nextMoviment = [xMove, yMove];
            hasPiece = table.isPosicaoOcupada({ linha: xMove, coluna: yMove });
            moviments.push(nextMoviment);
            if (xMove <= 0 || yMove >= 7)
                break;
            else {
                xMove = xMove - 1;
                yMove = yMove + 1;
            }
        }
        hasPiece = false;
        xMove = x + 1;
        yMove = y + 1;
        while (!hasPiece) {
            var nextMoviment = [xMove, yMove];
            hasPiece = table.isPosicaoOcupada({ linha: xMove, coluna: yMove });
            moviments.push(nextMoviment);
            if (xMove >= 7 || yMove >= 7)
                break;
            else {
                xMove = xMove + 1;
                yMove = yMove + 1;
            }
        }
        hasPiece = false;
        xMove = x - 1;
        yMove = y - 1;
        while (!hasPiece) {
            var nextMoviment = [xMove, yMove];
            hasPiece = table.isPosicaoOcupada({ linha: xMove, coluna: yMove });
            moviments.push(nextMoviment);
            if (xMove <= 0 || yMove <= 0)
                break;
            else {
                xMove = xMove - 1;
                yMove = yMove - 1;
            }
        }
        return moviments;
    }
};
var Rainha = (function (_super) {
    __extends(Rainha, _super);
    function Rainha(cor) {
        var _this = this;
        var movimentos = [new MovimentoVertical_1.MovimentoVertical(), new MovimentoHorizontal_1.MovimentoHorizontal(), new MovimentoDiagonal_1.MovimentoDiagonal()];
        _this = _super.call(this, TipoPeca_1.TipoPeca.RAINHA, cor, movimentos, true) || this;
        return _this;
    }
    Rainha.prototype.simularMovimento = function () {
        var posicao = this.getItemTabuleiro().getPosicao();
        var extensaoVertical = ExtensorPosicoes_1.ExtensorPosicoes.extenderVertical([posicao]);
        return extensaoVertical.concat(ExtensorPosicoes_1.ExtensorPosicoes.extenderHorizontal([posicao])).concat(ExtensorPosicoes_1.ExtensorPosicoes.extenderDiagonal(posicao));
    };
    Rainha.prototype.calculateMoviment = function (tabuleiro) {
        var _this = this;
        this.possibleMoves = lodash_1.default.flatten(this.movimentos.map(function (moviment) {
            return calculatePossibleMoviment(_this.getItemTabuleiro().getPosicao(), tabuleiro, moviment.getTipo());
        }));
    };
    return Rainha;
}(Peca_1.Peca));
exports.Rainha = Rainha;
