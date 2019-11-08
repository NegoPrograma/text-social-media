
/*
A função de um router é controlar os caminhos que seu webapp vai ter.

O que aconteceu aqui é que separamos a instância que cuida dos gets e posts do express e demos essa função para outro arquivo, afim de organizar o app.


A metodologia geral de uso é: define o .get e post aqui, e no app vc usa a app.use("url",router)


*/

const express = require('express')
const router = express.Router();
const userController = require('./controllers/userController.js');
const postController = require('./controllers/postController.js');

router.get('/',userController.home);

/*dada a sintaxe de controllers, quando vc for por uma função no router
não é necessario executar(botar os parênteses) a função, apenas nomeie ela corretamente.*/
router.get('/create-post',userController.loggedIn,postController.createScreen);
router.get('/post/:id',postController.showPost);


router.post('/sign-out',userController.logout);
router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/create-post',userController.loggedIn,postController.create);

module.exports = router;