
/*
A função de um router é controlar os caminhos que seu webapp vai ter.

O que aconteceu aqui é que separamos a instância que cuida dos gets e posts do express e demos essa função para outro arquivo, afim de organizar o app.


A metodologia geral de uso é: define o .get e post aqui, e no app vc usa a app.use("url",router)


*/

const express = require('express')
const router = express.Router();
const userController = require('./controllers/userController.js');


router.get('/',userController.home);

/*dada a sintaxe de controllers, quando vc for por uma função no router
não é necessario executar(botar os parênteses) a função, apenas nomeie ela corretamente.*/
router.get('/about',);



router.post('/register',userController.register);
router.post('/login',userController.login);


module.exports = router;