"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColorAdapter;
(function (ColorAdapter) {
    function defineItemColor(_a) {
        var line = _a.linha, column = _a.coluna;
        var color = line % 2 === 0 ? "white" : "pink";
        var even = color;
        var odds = color == "pink" ? "white" : "pink";
        return column % 2 === 0 ? even : odds;
    }
    ColorAdapter.defineItemColor = defineItemColor;
})(ColorAdapter = exports.ColorAdapter || (exports.ColorAdapter = {}));
