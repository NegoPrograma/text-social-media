const express = require("express")
const app = express();
/*
a função require do node executa imediatamente após
o node executar o arquivo que a contém. 

*/
const router = require('./router.js');


//app.set("um objeto do express(como views, model ou view engines)","nome da pasta que guarda os arquivos correspondentes ou modulo correspondente para o objeto selecionado")
app.set('views','views');
app.set('view engine','ejs');

//basicamente um template que avisa o express que é pra passar as informações pro objeto request
app.use(express.urlencoded({extended:false}))
app.use(express.json());




app.use(express.static("public"));
//aqui, estamos dizendo que pra "/" e para qualquer caminho subsequente de "/", quem lida com os gets e posts é o router.
app.use('/',router);

app.listen(3002);