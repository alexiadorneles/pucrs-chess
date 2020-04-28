"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var lodash_1 = __importDefault(require("lodash"));
var PosicoesIniciais_1 = require("../definitions/PosicoesIniciais");
var TipoPeca_1 = require("../definitions/TipoPeca");
var DOMGenerator_1 = require("../DOMGenerator");
var DefinidorCores_1 = require("./DefinidorCores");
var InstanciadorPecas_1 = require("./InstanciadorPecas");
var ItemTabuleiro_1 = require("./ItemTabuleiro");
var initilizarMatriz = function () {
    var itens = [];
    itens[0] = [];
    itens[1] = [];
    itens[2] = [];
    itens[3] = [];
    itens[4] = [];
    itens[5] = [];
    itens[6] = [];
    itens[7] = [];
    return itens;
};
var Tabuleiro = (function () {
    function Tabuleiro() {
        var _this = this;
        this.posicoes = initilizarMatriz();
        this.gerarTabuleiroInicial = function () {
            var brancas = _this.gerarPecas("black");
            var pretas = _this.gerarPecas("grey");
            var vazias = _this.gerarPecasVazias();
            brancas.concat(pretas).concat(vazias).forEach(_this.adicionarItem);
            return _this;
        };
        this.salvar = function () { return __awaiter(_this, void 0, void 0, function () {
            var conteudo, url, config, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.percorrerTabuleiro(function (item) {
                            item.setTabuleiro(null);
                            if (item.getPeca()) {
                                item.getPeca().adicionarAoItem(null);
                            }
                        });
                        conteudo = JSON.stringify(this);
                        url = 'http://localhost:3000/salvar';
                        config = { headers: { 'Content-Type': 'application/json' } };
                        data = { json: conteudo };
                        return [4, axios_1.default.post(url, data, config)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); };
        this.isPosicaoValida = function (posicao) {
            return _this.isPosicaoExistente(posicao) && !_this.isPosicaoOcupada(posicao);
        };
        this.adicionarItem = function (item) {
            var _a = item.getPosicao(), linha = _a.line, coluna = _a.column;
            _this.posicoes[linha][coluna] = item;
            item.adicionarAoTabuleiro(_this);
        };
    }
    Tabuleiro.prototype.getItem = function (_a) {
        var linha = _a.line, coluna = _a.column;
        var posicaoExiste = this.isPosicaoExistente({ line: linha, column: coluna });
        return posicaoExiste ? this.posicoes[linha][coluna] : null;
    };
    Tabuleiro.prototype.destacarPosicoes = function (posicoes) {
        var _this = this;
        posicoes.forEach(function (posicao) {
            return _this.getItem(posicao).setDestaque(true);
        });
    };
    Tabuleiro.prototype.removerDestaques = function () {
        var removerDestaque = function (item) { return item.removerDestaque(); };
        this.percorrerTabuleiro(removerDestaque);
    };
    Tabuleiro.prototype.isBloqueadaPorOponente = function (posicao, posicaoInicial) {
        var bloqueante = this.isPosicaoExistente(posicao) && this.isPosicaoOcupada(posicao);
        var corBloqueante = bloqueante && this.isPosicaoOcupada(posicao).getCor();
        var corBloqueada = this.getItem(posicaoInicial).getPeca().getCor();
        return (corBloqueante) && (corBloqueada !== corBloqueante);
    };
    Tabuleiro.prototype.setPecaEmMovimento = function (peca) {
        if (this.pecaEmMovimento && !lodash_1.default.isEqual(this.pecaEmMovimento, peca)) {
            this.removerDestaques();
        }
        this.pecaEmMovimento = peca;
    };
    Tabuleiro.prototype.isPecaEmMovimento = function () {
        return !!this.pecaEmMovimento;
    };
    Tabuleiro.prototype.moverPeca = function (itemClicado) {
        var itemDaPeca = this.pecaEmMovimento.getItemTabuleiro();
        itemClicado.atribuirPeca(this.pecaEmMovimento);
        this.pecaEmMovimento = null;
        itemDaPeca.atribuirPeca(null);
        DOMGenerator_1.DOMGenerator.getInstance().refresh();
    };
    Tabuleiro.prototype.percorrerTabuleiro = function (callback) {
        for (var linha = 0; linha < 8; linha++)
            for (var coluna = 0; coluna < 8; coluna++)
                callback(this.getItem({ line: linha, column: coluna }), { line: linha, column: coluna });
    };
    Tabuleiro.prototype.isPosicaoExistente = function (posicao) {
        return (posicao.column < 8 && posicao.column >= 0) && (posicao.line >= 0 && posicao.line < 8);
    };
    Tabuleiro.prototype.isPosicaoOcupada = function (posicao) {
        return this.isPosicaoExistente(posicao) ? this.getItem(posicao).getPeca() : null;
    };
    Tabuleiro.prototype.gerarPecas = function (cor) {
        return Object.values(TipoPeca_1.TipoPeca)
            .filter(function (value) { return !!value; })
            .reduce(function (agg, tipo) { return agg.concat(InstanciadorPecas_1.InstanciadorPecas.instanciar(tipo, cor)); }, []);
    };
    Tabuleiro.prototype.gerarPecasVazias = function () {
        return PosicoesIniciais_1.MapPosicaoPecasBrancas.get(TipoPeca_1.TipoPeca.VAZIO).map(function (posicao) { return new ItemTabuleiro_1.ItemTabuleiro(posicao, DefinidorCores_1.ColorAdapter.defineItemColor(posicao)); });
    };
    return Tabuleiro;
}());
exports.Tabuleiro = Tabuleiro;
