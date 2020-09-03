"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var ColorOppositeMap = (_a = {},
    _a["black"] = "pink",
    _a["pink"] = "black",
    _a["dark-pink"] = "white",
    _a["white"] = "dark-pink",
    _a);
var isEven = function (number) { return number % 2 === 0; };
var ColorAdapter;
(function (ColorAdapter) {
    function defineItemColor(_a) {
        var line = _a.line, column = _a.column;
        var color = isEven(line) ? "black" : "pink";
        return isEven(column) ? color : getOppositeColor(color);
    }
    ColorAdapter.defineItemColor = defineItemColor;
    function getOppositeColor(color) {
        return ColorOppositeMap[color];
    }
})(ColorAdapter = exports.ColorAdapter || (exports.ColorAdapter = {}));
