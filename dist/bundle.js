(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOMGenerator = (function () {
    function DOMGenerator() {
    }
    DOMGenerator.prototype.injetarTabuleiro = function (tabuleiro) {
        this.tabuleiro = tabuleiro;
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
        var linhas = 8;
        var colunas = 8;
        var elementosLinha = [];
        var elementosColuna = [];
        var _loop_1 = function (linha) {
            elementosColuna = [];
            for (var coluna = 0; coluna < colunas; coluna++) {
                var item = this_1.tabuleiro.getItem({ linha: linha, coluna: coluna });
                var elemento = this_1.criarElemento(item);
                elementosColuna.push(elemento);
            }
            var elementoLinha = document.createElement('div');
            elementoLinha.setAttribute('class', 'xadrez-linha');
            elementosColuna.forEach((function (elementoColuna) { return elementoLinha.appendChild(elementoColuna); }));
            elementosLinha.push(elementoLinha);
        };
        var this_1 = this;
        for (var linha = 0; linha < linhas; linha++) {
            _loop_1(linha);
        }
        elementosLinha.forEach(function (elemento) { return root.appendChild(elemento); });
    };
    DOMGenerator.prototype.criarElemento = function (item) {
        var div = document.createElement('div');
        div.setAttribute('class', 'container');
        var quadrado = document.createElement('span');
        quadrado.setAttribute('class', "fas fa-square-full xadrez-quadrado " + item.getCor());
        quadrado.addEventListener('click', item.onClick);
        item.atribuirElemento(quadrado);
        var iconePeca = this.criarIconePeca(item.getPeca());
        div.appendChild(iconePeca);
        div.appendChild(quadrado);
        return div;
    };
    DOMGenerator.prototype.criarIconePeca = function (peca) {
        var tipoPeca = peca && peca.getTipo() || '';
        var corPeca = peca && peca.getCor() || '';
        var iconePeca = document.createElement('i');
        iconePeca.setAttribute('class', "fas fa-" + tipoPeca + " peca " + corPeca);
        return iconePeca;
    };
    return DOMGenerator;
}());
exports.DOMGenerator = DOMGenerator;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TipoPeca_1 = require("../definitions/TipoPeca");
var posicaoPeoesBrancos = [
    { linha: 1, coluna: 0 },
    { linha: 1, coluna: 1 },
    { linha: 1, coluna: 2 },
    { linha: 1, coluna: 3 },
    { linha: 1, coluna: 4 },
    { linha: 1, coluna: 5 },
    { linha: 1, coluna: 6 },
    { linha: 1, coluna: 7 },
];
var posicaoTorresBrancas = [
    { linha: 0, coluna: 0 },
    { linha: 0, coluna: 7 },
];
var posicaoCavalosBrancos = [
    { linha: 0, coluna: 1 },
    { linha: 0, coluna: 6 },
];
var posicaoBisposBrancos = [
    { linha: 0, coluna: 2 },
    { linha: 0, coluna: 5 },
];
var posicaoRainha = [
    { linha: 0, coluna: 3 },
];
var posicaoRei = [
    { linha: 0, coluna: 4 },
];
var vazios = [
    { linha: 2, coluna: 0 },
    { linha: 2, coluna: 1 },
    { linha: 2, coluna: 2 },
    { linha: 2, coluna: 3 },
    { linha: 2, coluna: 4 },
    { linha: 2, coluna: 5 },
    { linha: 2, coluna: 6 },
    { linha: 2, coluna: 7 },
    { linha: 3, coluna: 0 },
    { linha: 3, coluna: 1 },
    { linha: 3, coluna: 2 },
    { linha: 3, coluna: 3 },
    { linha: 3, coluna: 4 },
    { linha: 3, coluna: 5 },
    { linha: 3, coluna: 6 },
    { linha: 3, coluna: 7 },
    { linha: 4, coluna: 0 },
    { linha: 4, coluna: 1 },
    { linha: 4, coluna: 2 },
    { linha: 4, coluna: 3 },
    { linha: 4, coluna: 4 },
    { linha: 4, coluna: 5 },
    { linha: 4, coluna: 6 },
    { linha: 4, coluna: 7 },
    { linha: 5, coluna: 0 },
    { linha: 5, coluna: 1 },
    { linha: 5, coluna: 2 },
    { linha: 5, coluna: 3 },
    { linha: 5, coluna: 4 },
    { linha: 5, coluna: 5 },
    { linha: 5, coluna: 6 },
    { linha: 5, coluna: 7 },
];
exports.MapPosicaoPecasBrancas = new Map([
    [TipoPeca_1.TipoPeca.PEAO, posicaoPeoesBrancos],
    [TipoPeca_1.TipoPeca.TORRE, posicaoTorresBrancas],
    [TipoPeca_1.TipoPeca.CAVALO, posicaoCavalosBrancos],
    [TipoPeca_1.TipoPeca.BISPO, posicaoBisposBrancos],
    [TipoPeca_1.TipoPeca.RAINHA, posicaoRainha],
    [TipoPeca_1.TipoPeca.REI, posicaoRei],
    [TipoPeca_1.TipoPeca.VAZIO, vazios],
]);
var posicaoPeoesPretos = [
    { linha: 6, coluna: 0 },
    { linha: 6, coluna: 1 },
    { linha: 6, coluna: 2 },
    { linha: 6, coluna: 3 },
    { linha: 6, coluna: 4 },
    { linha: 6, coluna: 5 },
    { linha: 6, coluna: 6 },
    { linha: 6, coluna: 7 },
];
var posicaoTorresPretos = [
    { linha: 7, coluna: 0 },
    { linha: 7, coluna: 7 },
];
var posicaoCavalosPretos = [
    { linha: 7, coluna: 1 },
    { linha: 7, coluna: 6 },
];
var posicaoBisposPretos = [
    { linha: 7, coluna: 2 },
    { linha: 7, coluna: 5 },
];
var posicaoRainhaPreto = [
    { linha: 7, coluna: 3 },
];
var posicaoReiPreto = [
    { linha: 7, coluna: 4 },
];
exports.MapPosicaoPecasPretas = new Map([
    [TipoPeca_1.TipoPeca.PEAO, posicaoPeoesPretos],
    [TipoPeca_1.TipoPeca.TORRE, posicaoTorresPretos],
    [TipoPeca_1.TipoPeca.CAVALO, posicaoCavalosPretos],
    [TipoPeca_1.TipoPeca.BISPO, posicaoBisposPretos],
    [TipoPeca_1.TipoPeca.RAINHA, posicaoRainhaPreto],
    [TipoPeca_1.TipoPeca.REI, posicaoReiPreto],
]);

},{"../definitions/TipoPeca":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TipoPeca;
(function (TipoPeca) {
    TipoPeca["PEAO"] = "chess-pawn";
    TipoPeca["CAVALO"] = "chess-knight";
    TipoPeca["REI"] = "chess-king";
    TipoPeca["RAINHA"] = "chess-queen";
    TipoPeca["BISPO"] = "chess-bishop";
    TipoPeca["TORRE"] = "chess-rook";
    TipoPeca["VAZIO"] = "";
})(TipoPeca = exports.TipoPeca || (exports.TipoPeca = {}));

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefinidorCores;
(function (DefinidorCores) {
    function definir(_a) {
        var linha = _a.linha, coluna = _a.coluna;
        var cor = linha % 2 === 0 ? "green" : "black";
        var pares = cor;
        var impares = cor == "green" ? "black" : "green";
        return coluna % 2 === 0 ? pares : impares;
    }
    DefinidorCores.definir = definir;
})(DefinidorCores = exports.DefinidorCores || (exports.DefinidorCores = {}));

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TipoPeca_1 = require("../definitions/TipoPeca");
var PosicoesIniciais_1 = require("../definitions/PosicoesIniciais");
var ItemTabuleiro_1 = require("../domain/ItemTabuleiro");
var DefinidorCores_1 = require("./DefinidorCores");
var Cavalo_1 = require("../domain/peca/Cavalo");
var Peoes_1 = require("../domain/peca/Peoes");
var Bispo_1 = require("../domain/peca/Bispo");
var Rainha_1 = require("../domain/peca/Rainha");
var Rei_1 = require("../domain/peca/Rei");
var Torre_1 = require("../domain/peca/Torre");
var InstanciadorTipoMap = new Map([
    [TipoPeca_1.TipoPeca.PEAO, Peoes_1.Peao],
    [TipoPeca_1.TipoPeca.CAVALO, Cavalo_1.Cavalo],
    [TipoPeca_1.TipoPeca.BISPO, Bispo_1.Bispo],
    [TipoPeca_1.TipoPeca.RAINHA, Rainha_1.Rainha],
    [TipoPeca_1.TipoPeca.REI, Rei_1.Rei],
    [TipoPeca_1.TipoPeca.TORRE, Torre_1.Torre],
]);
var InstanciadorPecas;
(function (InstanciadorPecas) {
    function instanciar(tipo, corPeca) {
        var map = corPeca === "white" ? PosicoesIniciais_1.MapPosicaoPecasBrancas : PosicoesIniciais_1.MapPosicaoPecasPretas;
        return map.get(tipo).map(function (posicao) {
            var clazz = InstanciadorTipoMap.get(tipo);
            var item = new ItemTabuleiro_1.ItemTabuleiro(posicao, DefinidorCores_1.DefinidorCores.definir(posicao));
            var peca = new clazz(corPeca);
            item.atribuirPeca(peca);
            return item;
        });
    }
    InstanciadorPecas.instanciar = instanciar;
})(InstanciadorPecas = exports.InstanciadorPecas || (exports.InstanciadorPecas = {}));

},{"../definitions/PosicoesIniciais":2,"../definitions/TipoPeca":3,"../domain/ItemTabuleiro":6,"../domain/peca/Bispo":13,"../domain/peca/Cavalo":14,"../domain/peca/Peoes":16,"../domain/peca/Rainha":17,"../domain/peca/Rei":18,"../domain/peca/Torre":19,"./DefinidorCores":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemTabuleiro = (function () {
    function ItemTabuleiro(posicao, cor) {
        var _this = this;
        this.posicao = posicao;
        this.cor = cor;
        this.onClick = function (event) {
            if (!_this.isDestacado) {
                if (_this.peca) {
                    _this.tabuleiro.setPecaEmMovimento(_this.peca);
                    _this.setDestaque(true);
                }
            }
            else {
                if (!_this.peca) {
                    if (_this.tabuleiro.isPecaEmMovimento()) {
                        _this.tabuleiro.moverPeca(_this);
                    }
                }
                else {
                    _this.setDestaque(false);
                }
            }
        };
    }
    ItemTabuleiro.prototype.atribuirPeca = function (peca) {
        this.peca = peca;
        if (peca) {
            this.peca.adicionarAoItem(this);
        }
    };
    ItemTabuleiro.prototype.atribuirElemento = function (elemento) {
        this.elemento = elemento;
    };
    ItemTabuleiro.prototype.adicionarAoTabuleiro = function (tabuleiro) {
        this.tabuleiro = tabuleiro;
    };
    ItemTabuleiro.prototype.getCor = function () {
        return this.cor;
    };
    ItemTabuleiro.prototype.getPeca = function () {
        return this.peca;
    };
    ItemTabuleiro.prototype.getPosicao = function () {
        return this.posicao;
    };
    ItemTabuleiro.prototype.setDestaque = function (isDestacado) {
        this.isDestacado = isDestacado;
        this.atualizarClasse();
        if (this.isDestacado) {
            this.simularMovimento();
        }
        else {
            this.removerDestaques();
        }
    };
    ItemTabuleiro.prototype.removerDestaque = function () {
        this.isDestacado = false;
        this.atualizarClasse();
    };
    ItemTabuleiro.prototype.removerDestaques = function () {
        this.tabuleiro.removerDestaques();
    };
    ItemTabuleiro.prototype.simularMovimento = function () {
        if (this.peca) {
            var posicoes = this.peca.simularMovimento();
            this.tabuleiro.destacarPosicoes(posicoes);
        }
    };
    ItemTabuleiro.prototype.atualizarClasse = function () {
        var styleClass = this.elemento.getAttribute('class');
        var jaDestacado = styleClass.includes('destaque');
        if (jaDestacado && !this.isDestacado)
            styleClass = styleClass.replace('destaque', '');
        var destaqueClass = this.isDestacado && !jaDestacado ? 'destaque' : '';
        this.elemento.setAttribute('class', styleClass + " " + destaqueClass);
    };
    return ItemTabuleiro;
}());
exports.ItemTabuleiro = ItemTabuleiro;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemTabuleiro_1 = require("./ItemTabuleiro");
var InstanciadorPecas_1 = require("../domain/InstanciadorPecas");
var TipoPeca_1 = require("../definitions/TipoPeca");
var PosicoesIniciais_1 = require("../definitions/PosicoesIniciais");
var DefinidorCores_1 = require("../domain/DefinidorCores");
var DOMGenerator_1 = require("../DOMGenerator");
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
            var brancas = _this.gerarPecas("white");
            var pretas = _this.gerarPecas("rosa");
            var vazias = _this.gerarPecasVazias();
            brancas.concat(pretas).concat(vazias).forEach(_this.adicionarItem);
            return _this;
        };
        this.adicionarItem = function (item) {
            var _a = item.getPosicao(), linha = _a.linha, coluna = _a.coluna;
            _this.posicoes[linha][coluna] = item;
            item.adicionarAoTabuleiro(_this);
        };
    }
    Tabuleiro.prototype.getItem = function (_a) {
        var linha = _a.linha, coluna = _a.coluna;
        return this.posicoes[linha][coluna];
    };
    Tabuleiro.prototype.destacarPosicoes = function (posicoes) {
        var _this = this;
        posicoes.forEach(function (posicao) {
            if (_this.isPosicaoValida(posicao)) {
                _this.getItem(posicao).setDestaque(true);
            }
        });
    };
    Tabuleiro.prototype.removerDestaques = function () {
        var removerDestaque = function (item) { return item.removerDestaque(); };
        this.percorrerTabuleiro(removerDestaque);
    };
    Tabuleiro.prototype.setPecaEmMovimento = function (peca) {
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
                callback(this.getItem({ linha: linha, coluna: coluna }));
    };
    Tabuleiro.prototype.isPosicaoValida = function (posicao) {
        var posicaoExiste = posicao.coluna < 8 && posicao.linha >= 0;
        var posicaoLivre = !Boolean(this.getItem(posicao).getPeca());
        return posicaoExiste && posicaoLivre;
    };
    Tabuleiro.prototype.gerarPecas = function (cor) {
        return Object.values(TipoPeca_1.TipoPeca)
            .filter(function (value) { return !!value; })
            .reduce(function (agg, tipo) { return agg.concat(InstanciadorPecas_1.InstanciadorPecas.instanciar(tipo, cor)); }, []);
    };
    Tabuleiro.prototype.gerarPecasVazias = function () {
        return PosicoesIniciais_1.MapPosicaoPecasBrancas.get(TipoPeca_1.TipoPeca.VAZIO).map(function (posicao) { return new ItemTabuleiro_1.ItemTabuleiro(posicao, DefinidorCores_1.DefinidorCores.definir(posicao)); });
    };
    return Tabuleiro;
}());
exports.Tabuleiro = Tabuleiro;

},{"../DOMGenerator":1,"../definitions/PosicoesIniciais":2,"../definitions/TipoPeca":3,"../domain/DefinidorCores":4,"../domain/InstanciadorPecas":5,"./ItemTabuleiro":6}],8:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Movimento = (function () {
    function Movimento(tipo) {
        this.tipo = tipo;
    }
    Movimento.prototype.simularMovimento = function (posicaoAtual, podeIrPraTras) {
        var _this = this;
        var novasPosicoesFrente = this.offsetMovimentos.map(function (offset) { return _this.aplicarOffsetParaFrente(offset, posicaoAtual); });
        var novasPosicoesTras = this.offsetMovimentos.map(function (offset) { return _this.aplicarOffsetParaTras(offset, posicaoAtual); });
        return podeIrPraTras ? novasPosicoesFrente.concat(novasPosicoesTras) : novasPosicoesFrente;
    };
    Movimento.prototype.aplicarOffsetParaFrente = function (offset, posicao) {
        var novaPosicao = __assign({}, posicao);
        novaPosicao.coluna = posicao.coluna + offset.coluna;
        novaPosicao.linha = posicao.linha + offset.linha;
        return novaPosicao;
    };
    Movimento.prototype.aplicarOffsetParaTras = function (offset, posicao) {
        var novaPosicao = __assign({}, posicao);
        novaPosicao.coluna = posicao.coluna - offset.coluna;
        novaPosicao.linha = posicao.linha - offset.linha;
        return novaPosicao;
    };
    return Movimento;
}());
exports.Movimento = Movimento;

},{}],9:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Movimento_1 = require("./Movimento");
var MovimentoDiagonal = (function (_super) {
    __extends(MovimentoDiagonal, _super);
    function MovimentoDiagonal() {
        var _this = _super.call(this, 2) || this;
        _this.offsetMovimentos = [{ coluna: 1, linha: 1 }];
        return _this;
    }
    return MovimentoDiagonal;
}(Movimento_1.Movimento));
exports.MovimentoDiagonal = MovimentoDiagonal;

},{"./Movimento":8}],10:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Movimento_1 = require("./Movimento");
var MovimentoHorizontal = (function (_super) {
    __extends(MovimentoHorizontal, _super);
    function MovimentoHorizontal() {
        var _this = _super.call(this, 0) || this;
        _this.offsetMovimentos = [{ coluna: 1, linha: 0 }];
        return _this;
    }
    return MovimentoHorizontal;
}(Movimento_1.Movimento));
exports.MovimentoHorizontal = MovimentoHorizontal;

},{"./Movimento":8}],11:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Movimento_1 = require("./Movimento");
var MovimentoL = (function (_super) {
    __extends(MovimentoL, _super);
    function MovimentoL() {
        var _this = _super.call(this, 3) || this;
        _this.offsetMovimentos = [
            { coluna: 2, linha: 1 },
            { coluna: 1, linha: 2 },
        ];
        return _this;
    }
    return MovimentoL;
}(Movimento_1.Movimento));
exports.MovimentoL = MovimentoL;

},{"./Movimento":8}],12:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Movimento_1 = require("./Movimento");
var MovimentoVertical = (function (_super) {
    __extends(MovimentoVertical, _super);
    function MovimentoVertical() {
        var _this = _super.call(this, 1) || this;
        _this.offsetMovimentos = [{ coluna: 0, linha: 1 }];
        return _this;
    }
    return MovimentoVertical;
}(Movimento_1.Movimento));
exports.MovimentoVertical = MovimentoVertical;

},{"./Movimento":8}],13:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Peca_1 = require("./Peca");
var TipoPeca_1 = require("../../definitions/TipoPeca");
var MovimentoDiagonal_1 = require("../movimento/MovimentoDiagonal");
var Bispo = (function (_super) {
    __extends(Bispo, _super);
    function Bispo(cor) {
        var _this = this;
        var movimentos = [new MovimentoDiagonal_1.MovimentoDiagonal()];
        _this = _super.call(this, TipoPeca_1.TipoPeca.BISPO, cor, movimentos, true) || this;
        return _this;
    }
    return Bispo;
}(Peca_1.Peca));
exports.Bispo = Bispo;

},{"../../definitions/TipoPeca":3,"../movimento/MovimentoDiagonal":9,"./Peca":15}],14:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Peca_1 = require("./Peca");
var TipoPeca_1 = require("../../definitions/TipoPeca");
var MovimentoL_1 = require("../movimento/MovimentoL");
var Cavalo = (function (_super) {
    __extends(Cavalo, _super);
    function Cavalo(cor) {
        var _this = this;
        var movimentos = [new MovimentoL_1.MovimentoL()];
        _this = _super.call(this, TipoPeca_1.TipoPeca.CAVALO, cor, movimentos, true) || this;
        return _this;
    }
    return Cavalo;
}(Peca_1.Peca));
exports.Cavalo = Cavalo;

},{"../../definitions/TipoPeca":3,"../movimento/MovimentoL":11,"./Peca":15}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Peca = (function () {
    function Peca(tipo, cor, movimentos, vaiPraTras) {
        this.tipo = tipo;
        this.cor = cor;
        this.movimentos = movimentos;
        this.vaiPraTras = vaiPraTras;
    }
    Peca.prototype.getItemTabuleiro = function () {
        return this.itemTabuleiro;
    };
    Peca.prototype.simularMovimento = function () {
        var _this = this;
        var posicaoPeca = this.itemTabuleiro.getPosicao();
        return this.movimentos
            .map(function (movimento) { return movimento.simularMovimento(posicaoPeca, _this.vaiPraTras); })
            .reduce(function (aggregation, movimento) { return aggregation.concat(movimento); }, []);
    };
    Peca.prototype.adicionarAoItem = function (item) {
        this.itemTabuleiro = item;
    };
    Peca.prototype.getCor = function () {
        return this.cor;
    };
    Peca.prototype.getTipo = function () {
        return this.tipo;
    };
    return Peca;
}());
exports.Peca = Peca;

},{}],16:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Peca_1 = require("./Peca");
var TipoPeca_1 = require("../../definitions/TipoPeca");
var MovimentoVertical_1 = require("../movimento/MovimentoVertical");
var Peao = (function (_super) {
    __extends(Peao, _super);
    function Peao(cor) {
        var _this = this;
        var movimentos = [new MovimentoVertical_1.MovimentoVertical()];
        _this = _super.call(this, TipoPeca_1.TipoPeca.PEAO, cor, movimentos, false) || this;
        return _this;
    }
    return Peao;
}(Peca_1.Peca));
exports.Peao = Peao;

},{"../../definitions/TipoPeca":3,"../movimento/MovimentoVertical":12,"./Peca":15}],17:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Peca_1 = require("./Peca");
var TipoPeca_1 = require("../../definitions/TipoPeca");
var MovimentoVertical_1 = require("../movimento/MovimentoVertical");
var MovimentoHorizontal_1 = require("../movimento/MovimentoHorizontal");
var MovimentoDiagonal_1 = require("../movimento/MovimentoDiagonal");
var Rainha = (function (_super) {
    __extends(Rainha, _super);
    function Rainha(cor) {
        var _this = this;
        var movimentos = [new MovimentoVertical_1.MovimentoVertical(), new MovimentoHorizontal_1.MovimentoHorizontal(), new MovimentoDiagonal_1.MovimentoDiagonal()];
        _this = _super.call(this, TipoPeca_1.TipoPeca.RAINHA, cor, movimentos, true) || this;
        return _this;
    }
    return Rainha;
}(Peca_1.Peca));
exports.Rainha = Rainha;

},{"../../definitions/TipoPeca":3,"../movimento/MovimentoDiagonal":9,"../movimento/MovimentoHorizontal":10,"../movimento/MovimentoVertical":12,"./Peca":15}],18:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Peca_1 = require("./Peca");
var TipoPeca_1 = require("../../definitions/TipoPeca");
var MovimentoVertical_1 = require("../movimento/MovimentoVertical");
var MovimentoHorizontal_1 = require("../movimento/MovimentoHorizontal");
var MovimentoDiagonal_1 = require("../movimento/MovimentoDiagonal");
var Rei = (function (_super) {
    __extends(Rei, _super);
    function Rei(cor) {
        var _this = this;
        var movimentos = [new MovimentoVertical_1.MovimentoVertical(), new MovimentoHorizontal_1.MovimentoHorizontal(), new MovimentoDiagonal_1.MovimentoDiagonal()];
        _this = _super.call(this, TipoPeca_1.TipoPeca.TORRE, cor, movimentos, true) || this;
        return _this;
    }
    return Rei;
}(Peca_1.Peca));
exports.Rei = Rei;

},{"../../definitions/TipoPeca":3,"../movimento/MovimentoDiagonal":9,"../movimento/MovimentoHorizontal":10,"../movimento/MovimentoVertical":12,"./Peca":15}],19:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Peca_1 = require("./Peca");
var TipoPeca_1 = require("../../definitions/TipoPeca");
var MovimentoVertical_1 = require("../movimento/MovimentoVertical");
var MovimentoHorizontal_1 = require("../movimento/MovimentoHorizontal");
var Torre = (function (_super) {
    __extends(Torre, _super);
    function Torre(cor) {
        var _this = this;
        var movimentos = [new MovimentoVertical_1.MovimentoVertical(), new MovimentoHorizontal_1.MovimentoHorizontal()];
        _this = _super.call(this, TipoPeca_1.TipoPeca.TORRE, cor, movimentos, true) || this;
        return _this;
    }
    return Torre;
}(Peca_1.Peca));
exports.Torre = Torre;

},{"../../definitions/TipoPeca":3,"../movimento/MovimentoHorizontal":10,"../movimento/MovimentoVertical":12,"./Peca":15}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tabuleiro_1 = require("./domain/Tabuleiro");
var DOMGenerator_1 = require("./DOMGenerator");
var tabuleiroInicial = new Tabuleiro_1.Tabuleiro().gerarTabuleiroInicial();
DOMGenerator_1.DOMGenerator.getInstance().injetarTabuleiro(tabuleiroInicial);
DOMGenerator_1.DOMGenerator.getInstance().refresh();

},{"./DOMGenerator":1,"./domain/Tabuleiro":7}]},{},[20]);
