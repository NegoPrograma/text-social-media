//exports.objeto/função/variavel outra sintaxe de exportar funções, de um jeito mais limpo.

const User = require('../models/User.js')

exports.login = () => {}

exports.logout = () => {}

exports.register = (req, res) => {
    let newUser = new User(req.body);
    newUser.register();  
    if(newUser.errors.length){
        res.send(newUser.errors);
    } else {
        res.send("Congrats, it's valid.");
    }
}

exports.home = (req, res) => {
    res.render('home-guest');
}
exports.profile = () =>{}