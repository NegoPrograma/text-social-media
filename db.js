const mongodb = require("mongodb").MongoClient;

//usamos o dotenv para configurarmos variaveis de ambiente, de modo que possamos proteger-las de quem quiser ver
const dotenv = require("dotenv");
dotenv.config()


let _db;
module.exports = {

    connectToServer: function(callback){
        mongodb.connect(process.env.CONNECTIONSTRING,{useNewUrlParser:true, useUnifiedTopology:true},(error,client)=>{
            //criamos um módulo isolado para poder chamar o db nos models.
            _db = client.db('socialmediaDB');
            return callback(error);
        });
        
    },

    getDb: function(){
        return _db;
    }
};

