"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOMGenerator = (function () {
    function DOMGenerator() {
    }
    DOMGenerator.prototype.injectBoard = function (board) {
        this.board = board;
    };
    DOMGenerator.prototype.getBoard = function () {
        return this.board;
    };
    DOMGenerator.getInstance = function () {
        if (!DOMGenerator.instance) {
            DOMGenerator.instance = new DOMGenerator();
        }
        return DOMGenerator.instance;
    };
    DOMGenerator.prototype.refresh = function () {
        var root = document.getElementById('root');
        root.innerHTML = '';
        var lines = 8;
        var columns = 8;
        var lineElements = [];
        var columnElements = [];
        var _loop_1 = function (line) {
            columnElements = [];
            for (var column = 0; column < columns; column++) {
                var item = this_1.board.getItem({ line: line, column: column });
                var element = this_1.createElement(item);
                columnElements.push(element);
            }
            var lineElement = document.createElement('div');
            lineElement.setAttribute('class', 'xadrez-linha');
            columnElements.forEach(function (columnElement) { return lineElement.appendChild(columnElement); });
            lineElements.push(lineElement);
        };
        var this_1 = this;
        for (var line = 0; line < lines; line++) {
            _loop_1(line);
        }
        lineElements.forEach(function (element) { return root.appendChild(element); });
    };
    DOMGenerator.prototype.createElement = function (item) {
        var div = document.createElement('div');
        div.setAttribute('class', 'container');
        var square = document.createElement('span');
        square.setAttribute('class', "fas fa-square-full xadrez-quadrado " + item.getCor());
        square.addEventListener('click', item.onClick);
        item.atribuirElemento(square);
        var pieceIcon = this.createPieceIcon(item.getPeca());
        pieceIcon.addEventListener('click', item.onClick);
        div.appendChild(pieceIcon);
        div.appendChild(square);
        return div;
    };
    DOMGenerator.prototype.createPieceIcon = function (piece) {
        var pieceType = (piece && piece.getKind()) || '';
        var pieceColor = (piece && piece.getCor()) || '';
        var pieceIcon = document.createElement('i');
        pieceIcon.setAttribute('class', "fas fa-" + pieceType + " peca " + pieceColor);
        return pieceIcon;
    };
    return DOMGenerator;
}());
exports.DOMGenerator = DOMGenerator;
