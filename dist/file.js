"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var fs_1 = __importDefault(require("fs"));
var cors_1 = __importDefault(require("cors"));
var carregarTabuleiro = function (req, res) {
    var a = process.cwd();
    console.log(a);
    var file = fs_1.default.readFileSync(process.cwd() + "/src/tabuleiro.json");
    console.log(file.toString());
    res.send(file.toString());
    res.end(file.toString());
};
var escreverJSON = function (req, res) {
    console.dir('body', req.body);
    fs_1.default.writeFile(process.cwd() + "/src/tabuleiro.json", req.body, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('The file was saved!');
    });
};
var app = express_1.default();
app.options('*', cors_1.default());
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.listen(3000, function () { return console.log("Express server is listening"); });
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.send('cors problem fixed:)');
});
app.get('/carregar', carregarTabuleiro);
app.post('/salvar', escreverJSON);
