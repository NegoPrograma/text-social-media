//exports.objeto/função/variavel outra sintaxe de exportar funções, de um jeito mais limpo.
const User = require('../models/User.js')

exports.login = (req,res) => {
    let user = new User(req.body);
    //dado que login retorna uma promise, ela tem métodos then e catch, para lidar com o sucesso ou insucesso da busca.
    user.login().then( (message)=>{
        req.session.user = {avatar:user.avatar,username: user.data.username};
        // nós não sabemos quanto tempo leva para o servidor guardar a sessão, por isso usaremos um callback para mostrar a view apenas após a função save ter sido completada
        req.session.save(()=>{
            res.redirect('/');
        });
    }).catch((e)=>{
        //o package do flash cria um atributo novo para session, que é um vetor cujo nome é o primeiro parâmetro e adiciona "e" nele
        //para acessar, usar req.session.flash.errors
        req.flash('errors',e); 
        req.session.save(()=>{res.redirect('/');});
    });
}

exports.logout = (req,res) => {
    req.session.destroy();
    res.redirect('/');
}

exports.register = (req, res) => {
    let user = new User(req.body);
    user.register().then(()=>{
        req.session.user = {avatar:user.avatar,username: user.data.username};
        req.session.save(()=>{
            res.redirect('/');
        });
    }).catch((regErrors)=>{
        regErrors.forEach((error)=>{
            req.flash('regErrors',error);
        });
        req.session.save(()=>{
            res.redirect('/');
        });
    });  
    
}


exports.home = (req, res) => {
    if(req.session.user){ 
        res.render("home-logged-in",{username: req.session.user.username,avatar: req.session.user.avatar});
    } else {
        //a requisição de flash retorna o array desejado e logo após se auto destrói.
        res.render("home-guest",{errors: req.flash('errors'),regErrors: req.flash('regErrors')});
    }
    
    //res.render('home-guest');
}
exports.profile = () =>{}