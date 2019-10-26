/*
resumindo muuuito, o Model representa uma abstração do que 
o controller lida. Basicamente, um conceito muito paralelo a criação de classes em programas POO

No model são feitos a definição também da validação dos dados, para garantir que vamos mandar a coisa certa pro bd


*/

//validator é um modulo open source para validar dados.
const validator = require("validator");


let User = function(data){
    //data é o json que contém todos os valores de req.body
    this.data = data;
    this.errors = [];
}

/* Um prototipo é basicamente um paralelo ao atributo static em java, uma função geral para qualquer instância 
User.prototype.jump = ()=>{}
*/
User.prototype.validate = function(){
    //validando o username
    if(this.data.username == ""){
        this.errors.push("You must provide a username.");
    } else {
        if(!validator.isAlphanumeric(this.data.username)){
            this.errors.push("Your username length should be 8~14 characters long.");
        }
        if(this.data.username.length > 14 || this.data.username.length < 8) {
            this.errors.push("Your username length should be 8~14 characters long.");
        }
    }

    //validando email
    if(!validator.isEmail(this.data.email)){
        this.errors.push("You must provide a valid email.");
    }


    //validando senha
    if(this.data.password == ""){
        this.errors.push("You must provide a password!");
    } else if(this.data.password.length > 14 || this.data.password.length < 8) {
        this.errors.push("Your password length should be 8~14 characters long.");
    }
}


User.prototype.register = function(){
    //1: validando a entrada do usuário
    this.validate();
    //2: tendo garantido as validações, vamos salvar os dados no bd.

}


module.exports = User;