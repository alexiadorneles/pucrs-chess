"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var DOMGenerator = (function () {
    function DOMGenerator() {
    }
    DOMGenerator.getInstance = function () {
        if (!DOMGenerator.instance) {
            DOMGenerator.instance = new DOMGenerator();
        }
        return DOMGenerator.instance;
    };
    DOMGenerator.prototype.refresh = function (boardComposite) {
        var root = document.getElementById('root');
        root.innerHTML = '';
        var board = boardComposite.createElement();
        var itemCompositeMatrix = lodash_1.default.chunk(boardComposite.getChildren(), 8);
        var lines = this.getBoardLines(itemCompositeMatrix);
        lines.forEach(function (line) { return board.appendChild(line); });
        root.appendChild(board);
    };
    DOMGenerator.prototype.getBoardLines = function (items) {
        var _this = this;
        var columns = items.map(function (composites) { return composites.map(function (item) { return _this.getItemWithPiece(item); }); });
        return columns.map(function (column) {
            var lineElement = document.createElement('div');
            lineElement.setAttribute('class', 'chess-line');
            column.forEach(function (element) { return lineElement.appendChild(element); });
            return lineElement;
        });
    };
    DOMGenerator.prototype.getItemWithPiece = function (boardItem) {
        var itemElement = boardItem.createElement();
        var piece = boardItem.getChildren()[0];
        if (piece) {
            var pieceElement = piece.createElement();
            pieceElement.addEventListener('click', boardItem.boardItem.onClick);
            itemElement.appendChild(pieceElement);
        }
        return itemElement;
    };
    return DOMGenerator;
}());
exports.DOMGenerator = DOMGenerator;
