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
var Movimento_1 = require("./Movimento");
var ModificadorImpl_1 = require("../ModificadorImpl");
var MovimentoL = (function (_super) {
    __extends(MovimentoL, _super);
    function MovimentoL() {
        var _this = _super.call(this, 3) || this;
        _this.offsetMovimentos = [
            {
                modificadorLinha: new ModificadorImpl_1.ModificadorImpl(2, ModificadorImpl_1.ModificadorImpl.soma),
                modificadorColuna: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.soma),
            },
            {
                modificadorLinha: new ModificadorImpl_1.ModificadorImpl(2, ModificadorImpl_1.ModificadorImpl.soma),
                modificadorColuna: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.subtracao),
            },
            {
                modificadorLinha: new ModificadorImpl_1.ModificadorImpl(2, ModificadorImpl_1.ModificadorImpl.subtracao),
                modificadorColuna: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.subtracao),
            },
            {
                modificadorLinha: new ModificadorImpl_1.ModificadorImpl(2, ModificadorImpl_1.ModificadorImpl.subtracao),
                modificadorColuna: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.soma),
            },
            {
                modificadorLinha: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.soma),
                modificadorColuna: new ModificadorImpl_1.ModificadorImpl(2, ModificadorImpl_1.ModificadorImpl.soma),
            },
            {
                modificadorLinha: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.subtracao),
                modificadorColuna: new ModificadorImpl_1.ModificadorImpl(2, ModificadorImpl_1.ModificadorImpl.soma),
            },
            {
                modificadorLinha: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.subtracao),
                modificadorColuna: new ModificadorImpl_1.ModificadorImpl(2, ModificadorImpl_1.ModificadorImpl.subtracao),
            },
            {
                modificadorLinha: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.soma),
                modificadorColuna: new ModificadorImpl_1.ModificadorImpl(2, ModificadorImpl_1.ModificadorImpl.subtracao),
            },
        ];
        return _this;
    }
    MovimentoL.prototype.simularMovimento = function (posicao, peca) {
        var _this = this;
        return this.offsetMovimentos
            .map(function (offset) { return _this.criarNovaPosicaoBaseadaEmOffset(posicao, offset); })
            .filter(function (posicao) { return peca.getTabuleiro().isPosicaoValida(posicao); });
    };
    return MovimentoL;
}(Movimento_1.Movimento));
exports.MovimentoL = MovimentoL;
