//exports.objeto/função/variavel outra sintaxe de exportar funções, de um jeito mais limpo.
const User = require('../models/User.js')

exports.login = (req,res) => {
    let user = new User(req.body);
    //dado que login retorna uma promise, ela tem métodos then e catch, para lidar com o sucesso ou insucesso da busca.
    user.login().then( (message)=>{
        res.send(message);
    } ).catch((e)=>{
        res.send(e);
    });
}

exports.logout = () => {}

exports.register = (req, res) => {
    let user = new User(req.body);
    user.register();  
    if(user.errors.length){
        res.send(user.errors);
    } else {
        res.send("Congrats, it's valid.");
    }
}

exports.home = (req, res) => {
    res.render('home-guest');
}
exports.profile = () =>{}