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
var PieceBuilder_1 = require("./domain/PieceBuilder");
var BoardItem_1 = require("./domain/BoardItem");
var Board_1 = require("./domain/Board");
var DOMGenerator_1 = require("./DOMGenerator");
var config_1 = require("./config");
var buildBoardModel = function (loaded) {
    var board = new Board_1.Board();
    return Object.assign(board, loaded);
};
var buildModelItem = function (loaded) {
    var boardItem = new BoardItem_1.BoardItem(loaded.posicao, loaded.cor);
    return Object.assign(boardItem, loaded);
};
var buildModelPiece = function (loaded) {
    var clazz = PieceBuilder_1.PieceBuilderMap.get(loaded.tipo);
    var piece = new clazz(loaded.cor);
    var model = Object.assign(piece, loaded);
    var movements = model.getMovements().map(function (mov) { return buildMovementModel(mov); });
    model.setMovements(movements);
    return model;
};
var buildMovementModel = function (loaded) {
    var clazz = PieceBuilder_1.MovementBuilderMap[loaded.tipo];
    var movement = new clazz();
    return Object.assign(movement, loaded);
};
var initialBoard = new Board_1.Board().initBoard();
var newGame = function () {
    DOMGenerator_1.DOMGenerator.getInstance().injectBoard(initialBoard);
    DOMGenerator_1.DOMGenerator.getInstance().refresh();
};
var loadGame = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, board;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, axios_1.default.get(config_1.API.LOAD_URL)];
            case 1:
                response = _a.sent();
                board = buildBoardModel(response.data);
                board.executeForAll(function (item, _a) {
                    var linha = _a.line, coluna = _a.column;
                    var itemModel = buildModelItem(item);
                    if (itemModel.getPiece()) {
                        var pieceModel = buildModelPiece(itemModel.getPiece());
                        itemModel.addPiece(pieceModel);
                    }
                    board.matrix[linha][coluna] = itemModel;
                    itemModel.addToBoard(board);
                });
                DOMGenerator_1.DOMGenerator.getInstance().injectBoard(board);
                DOMGenerator_1.DOMGenerator.getInstance().refresh();
                return [2];
        }
    });
}); };
var newGameButton = document.getElementById('novoJogo');
var loadGameButton = document.getElementById('carregarJogo');
var saveGameButton = document.getElementById('salvarJogo');
newGameButton.addEventListener('click', newGame);
loadGameButton.addEventListener('click', loadGame);
saveGameButton.addEventListener('click', function () {
    return DOMGenerator_1.DOMGenerator.getInstance()
        .getBoard()
        .save();
});
