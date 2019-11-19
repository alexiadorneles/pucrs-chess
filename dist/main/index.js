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
var Tabuleiro_1 = require("./domain/Tabuleiro");
var DOMGenerator_1 = require("./DOMGenerator");
var axios_1 = __importDefault(require("axios"));
var ItemTabuleiro_1 = require("./domain/ItemTabuleiro");
var InstanciadorPecas_1 = require("./domain/InstanciadorPecas");
var criarModelTabuleiro = function (carregado) {
    var tabuleiro = new Tabuleiro_1.Tabuleiro();
    return Object.assign(tabuleiro, carregado);
};
var criarModelItem = function (carregado) {
    var itemTabuleiro = new ItemTabuleiro_1.ItemTabuleiro(carregado.posicao, carregado.cor);
    return Object.assign(itemTabuleiro, carregado);
};
var criarModelPeca = function (carregado) {
    var clazz = InstanciadorPecas_1.InstanciadorTipoMap.get(carregado.tipo);
    var peca = new clazz(carregado.cor);
    var model = Object.assign(peca, carregado);
    var movimentos = model.getMovimentos().map(function (mov) { return criarModelMovimento(mov); });
    model.setMovimentos(movimentos);
    return model;
};
var criarModelMovimento = function (carregado) {
    var clazz = InstanciadorPecas_1.InstanciadorMovimentoMap[carregado.tipo];
    var movimento = new clazz();
    return Object.assign(movimento, carregado);
};
var tabuleiroInicial = new Tabuleiro_1.Tabuleiro().gerarTabuleiroInicial();
var novoJogo = function (event) {
    DOMGenerator_1.DOMGenerator.getInstance().injetarTabuleiro(tabuleiroInicial);
    DOMGenerator_1.DOMGenerator.getInstance().refresh();
};
var carregarJogo = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, tabuleiro;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, axios_1.default.get('http://localhost:3000/carregar')];
            case 1:
                response = _a.sent();
                tabuleiro = criarModelTabuleiro(response.data);
                tabuleiro.percorrerTabuleiro(function (item, _a) {
                    var linha = _a.linha, coluna = _a.coluna;
                    var itemModel = criarModelItem(item);
                    if (itemModel.getPeca()) {
                        var pecaModel = criarModelPeca(itemModel.getPeca());
                        itemModel.atribuirPeca(pecaModel);
                    }
                    tabuleiro.posicoes[linha][coluna] = itemModel;
                    itemModel.adicionarAoTabuleiro(tabuleiro);
                });
                DOMGenerator_1.DOMGenerator.getInstance().injetarTabuleiro(tabuleiro);
                DOMGenerator_1.DOMGenerator.getInstance().refresh();
                return [2];
        }
    });
}); };
var novoJogoButton = document.getElementById('novoJogo');
var carregarJogoButton = document.getElementById('carregarJogo');
var salvarJogoButton = document.getElementById('salvarJogo');
novoJogoButton.addEventListener('click', novoJogo);
carregarJogoButton.addEventListener('click', carregarJogo);
salvarJogoButton.addEventListener('click', function () { return DOMGenerator_1.DOMGenerator.getInstance().getTabuleiro().salvar(); });
