"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model = (function () {
    function Model() {
        this.store = {};
    }
    Model.prototype.set = function (key, value) {
        this.store[key] = value;
    };
    Model.prototype.get = function (key) {
        return this.store[key];
    };
    return Model;
}());
exports.Model = Model;
