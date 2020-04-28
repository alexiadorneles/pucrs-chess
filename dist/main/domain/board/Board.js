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
var InitialPositions_1 = require("../../definitions/InitialPositions");
var PieceKind_1 = require("../../definitions/PieceKind");
var DOMGenerator_1 = require("../../DOMGenerator");
var ColorAdapter_1 = require("../ColorAdapter");
var PieceBuilder_1 = require("../PieceBuilder");
var BoardItem_1 = require("./BoardItem");
var config_1 = require("../../config");
var initMatrix = function () {
    var matrix = [];
    matrix[0] = [];
    matrix[1] = [];
    matrix[2] = [];
    matrix[3] = [];
    matrix[4] = [];
    matrix[5] = [];
    matrix[6] = [];
    matrix[7] = [];
    return matrix;
};
var Board = (function () {
    function Board() {
        var _this = this;
        this.matrix = initMatrix();
        this.initBoard = function () {
            var whites = _this.buildPieces("black");
            var blacks = _this.buildPieces("grey");
            var empties = _this.buildEmptyPieces();
            whites
                .concat(blacks)
                .concat(empties)
                .forEach(_this.addItem);
            return _this;
        };
        this.save = function () { return __awaiter(_this, void 0, void 0, function () {
            var content, config, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.executeForAll(function (item) {
                            item.setBoard(null);
                            if (item.getPiece()) {
                                item.getPiece().addToItem(null);
                            }
                        });
                        content = JSON.stringify(this);
                        config = { headers: { 'Content-Type': 'application/json' } };
                        data = { json: content };
                        return [4, axios_1.default.post(config_1.API.SAVE_URL, data, config)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); };
        this.isValidPosition = function (position) {
            return _this.isPositionInMatrixRange(position) && !_this.getPieceByPosition(position);
        };
        this.addItem = function (item) {
            var _a = item.getPosition(), line = _a.line, column = _a.column;
            _this.matrix[line][column] = item;
            item.addToBoard(_this);
        };
    }
    Board.prototype.getItem = function (_a) {
        var line = _a.line, column = _a.column;
        var positionExists = this.isPositionInMatrixRange({ line: line, column: column });
        return positionExists ? this.matrix[line][column] : null;
    };
    Board.prototype.highlightPositions = function (positions) {
        var _this = this;
        positions.forEach(function (position) { return _this.getItem(position).setHighlight(true); });
    };
    Board.prototype.clearHighlights = function () {
        this.executeForAll(function (item) { return item.removeHighlight(); });
    };
    Board.prototype.isPositionBlockedByOpponent = function (position, initialPosition) {
        var blockingPiece = this.isPositionInMatrixRange(position) && this.getPieceByPosition(position);
        var blockingColor = blockingPiece && this.getPieceByPosition(position).getCor();
        var blockedColor = this.getItem(initialPosition)
            .getPiece()
            .getCor();
        return blockingColor && blockedColor !== blockingColor;
    };
    Board.prototype.setPecaEmMovimento = function (piece) {
        if (this.currentMovingPieces && !lodash_1.default.isEqual(this.currentMovingPieces, piece)) {
            this.clearHighlights();
        }
        this.currentMovingPieces = piece;
    };
    Board.prototype.isMovingPiece = function () {
        return !!this.currentMovingPieces;
    };
    Board.prototype.movePiece = function (clickedItem) {
        var pieceItem = this.currentMovingPieces.getBoardItem();
        clickedItem.addPiece(this.currentMovingPieces);
        this.currentMovingPieces = null;
        pieceItem.addPiece(null);
        DOMGenerator_1.DOMGenerator.getInstance().refresh();
    };
    Board.prototype.executeForAll = function (callback) {
        for (var line = 0; line < 8; line++)
            for (var column = 0; column < 8; column++)
                callback(this.getItem({ line: line, column: column }), { line: line, column: column });
    };
    Board.prototype.isPositionInMatrixRange = function (position) {
        return position.column < 8 && position.column >= 0 && position.line >= 0 && position.line < 8;
    };
    Board.prototype.getPieceByPosition = function (position) {
        return this.isPositionInMatrixRange(position) ? this.getItem(position).getPiece() : null;
    };
    Board.prototype.buildPieces = function (cor) {
        return Object.values(PieceKind_1.PieceKind)
            .filter(Boolean)
            .reduce(function (agg, kind) { return agg.concat(PieceBuilder_1.PieceBuilder.build(kind, cor)); }, []);
    };
    Board.prototype.buildEmptyPieces = function () {
        return InitialPositions_1.WhitePiecesPositionMap.get(PieceKind_1.PieceKind.EMPTY).map(function (position) { return new BoardItem_1.BoardItem(position, ColorAdapter_1.ColorAdapter.defineItemColor(position)); });
    };
    return Board;
}());
exports.Board = Board;
