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
        var board = this.board.createElement();
        root.appendChild(board);
    };
    return DOMGenerator;
}());
exports.DOMGenerator = DOMGenerator;
