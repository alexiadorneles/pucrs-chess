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
Object.defineProperty(exports, "__esModule", { value: true });
var ModificadorImpl_1 = require("../ModificadorImpl");
var Movement_1 = require("./Movement");
var MovimentoL = (function (_super) {
    __extends(MovimentoL, _super);
    function MovimentoL() {
        return _super.call(this, 3) || this;
    }
    MovimentoL.prototype.getMovementOffsets = function () {
        return [
            {
                lineModifier: new ModificadorImpl_1.ModificadorImpl(2, ModificadorImpl_1.ModificadorImpl.soma),
                columnModifier: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.soma),
            },
            {
                lineModifier: new ModificadorImpl_1.ModificadorImpl(2, ModificadorImpl_1.ModificadorImpl.soma),
                columnModifier: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.subtracao),
            },
            {
                lineModifier: new ModificadorImpl_1.ModificadorImpl(2, ModificadorImpl_1.ModificadorImpl.subtracao),
                columnModifier: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.subtracao),
            },
            {
                lineModifier: new ModificadorImpl_1.ModificadorImpl(2, ModificadorImpl_1.ModificadorImpl.subtracao),
                columnModifier: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.soma),
            },
            {
                lineModifier: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.soma),
                columnModifier: new ModificadorImpl_1.ModificadorImpl(2, ModificadorImpl_1.ModificadorImpl.soma),
            },
            {
                lineModifier: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.subtracao),
                columnModifier: new ModificadorImpl_1.ModificadorImpl(2, ModificadorImpl_1.ModificadorImpl.soma),
            },
            {
                lineModifier: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.subtracao),
                columnModifier: new ModificadorImpl_1.ModificadorImpl(2, ModificadorImpl_1.ModificadorImpl.subtracao),
            },
            {
                lineModifier: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.soma),
                columnModifier: new ModificadorImpl_1.ModificadorImpl(2, ModificadorImpl_1.ModificadorImpl.subtracao),
            },
        ];
    };
    MovimentoL.prototype.executeSimulation = function (posicaoInicial, tabuleiro) {
        var _this = this;
        return this.getMovementOffsets()
            .map(function (offset) { return _this.createNewPositionBasedOnOffset(posicaoInicial, offset); })
            .filter(function (posicao) { return tabuleiro.isPosicaoExistente(posicao); })
            .filter(function (posicao) {
            return !tabuleiro.isPosicaoOcupada(posicao) ||
                tabuleiro.isBloqueadaPorOponente(posicao, posicaoInicial);
        });
    };
    return MovimentoL;
}(Movement_1.Movement));
exports.MovimentoL = MovimentoL;
