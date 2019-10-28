const dbManager = require("./db");

dbManager.connectToServer((err,client)=>{
    if(err) console.log(err);
    else{
//não houve erro, logo o bd foi conectado com sucesso.
const express = require("express")
const app = express();
/*
a função require do node executa imediatamente após
o node executar o arquivo que a contém. 

*/
const router = require('./router.js');
//configurando a porta de acesso 
const dotenv = require("dotenv");
dotenv.config()

//modulo de flash para modelar erros 
const flash = require('connect-flash')

//configurando a session do app
const session = require('express-session');
//mongo store é um módulo cujo objetivo é auxiliar o armazenamento da sessão no BD, para que as sessões não fiquem dependentes do estado atual do servidor
const MongoStore = require('connect-mongo')(session);
let sessionOptions = session({
    secret: "JS é foda",
    store: new MongoStore({client: dbManager.getClient()}),
    resave: false,
    saveUninitialized: false,
    cookie : {
        //definindo a duração de session
        maxAge:1000*60*60*24,
        httpOnly: true
        }
});



app.use(sessionOptions);
app.use(flash());

//app.use(callback) representa algo que é chamado  antes de qualquer request
app.use(function(req,res,next){
    //res.locals é um objeto dinâmico que pode servir de parâmetro em todo arquivo EJS
    res.locals.user = req.session.user;
    next();
});

//app.set("um objeto do express(como views, model ou view engines)","nome da pasta que guarda os arquivos correspondentes ou modulo correspondente para o objeto selecionado")
app.set('views','views');
app.set('view engine','ejs');

//basicamente um template que avisa o express que é pra passar as informações pro objeto request
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(express.static("public"));
//aqui, estamos dizendo que pra "/" e para qualquer caminho subsequente de "/", quem lida com os gets e posts é o router.
app.use('/',router);
app.listen(process.env.PORT);
    }
    
});
