/*
resumindo muuuito, o Model representa uma abstração do que 
o controller lida. Basicamente, um conceito muito paralelo a criação de classes em programas POO

No model são feitos a definição também da validação dos dados, para garantir que vamos mandar a coisa certa pro bd


*/

//validator é um modulo open source para validar dados.
const validator = require("validator");


//setando o collection de user
const db = require("../db.js").getDb();
const usersCollection = db.collection("users");




class User {
    constructor(data) {
        //data é o json que contém todos os valores de req.body
        this.data = data;
        this.errors = [];
    }
    /* Um prototipo é basicamente um paralelo ao atributo static em java, uma função geral para qualquer instância
    User.prototype.jump = ()=>{}
    */
    //cleanEntry tem como propósito garantir que o usuário não mande nenhum código pelo registro, apenas strings.
    cleanEntry() {
        console.log(typeof (this.data.username));
        if (typeof(this.data.username) != "string") {
            this.data.username = "";
        }
        if (typeof(this.data.email) != "string") {
            this.data.email = "";
        }
        if (typeof(this.data.password) != "string") {
            this.data.password = "";
        }
        //talvez o usuário até tenha posto os dados certos, porém ele pode ter adicionado outras propriedades que não competem a data, como um "virus: link"
        this.data = {
            username: this.data.username.trim().toLowerCase(),
            email: this.data.email.trim().toLowerCase(),
            password: this.data.password
        };
    }
    //função para validar a entrada.
    validate() {
        //validando o username
        if (this.data.username == "") {
            this.errors.push("You must provide a username.");
        }
        else {
            if (!validator.isAlphanumeric(this.data.username)) {
                this.errors.push("Your username can only contain letters and numbers(no special symbols).");
            }
            if (this.data.username.length > 14 || this.data.username.length < 8) {
                this.errors.push("Your username length should be 8~14 characters long.");
            }
        }
        //validando email
        if (!validator.isEmail(this.data.email)) {
            this.errors.push("You must provide a valid email.");
        }
        //validando senha
        if (this.data.password == "") {
            this.errors.push("You must provide a password!");
        }
        else if (this.data.password.length > 14 || this.data.password.length < 8) {
            this.errors.push("Your password length should be 8~14 characters long.");
        }
    }
    register() {
        //1: validando a entrada do usuário
        this.cleanEntry();
        this.validate();
        console.log(this.errors.length);
        
        //2: tendo garantido as validações, vamos salvar os dados no bd.
        if (this.errors.length == 0) {
            usersCollection.insertOne(this.data);
        }
    }
}







module.exports = User;