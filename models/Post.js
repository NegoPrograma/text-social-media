
const db = require("../db.js").getDb();
const postsCollection = db.collection("posts");
const ObjectID = require("mongodb").ObjectID;
const User = require('./User');


class Post {
    constructor(data,_id){
        this.data = data;
        this.errors = [];
        this._id = _id;
    }

    cleanEntry() {
        if(typeof(this.data.title) != "string"){
            this.data.title = "";
        }
        if(typeof(this.data.body) != "string"){
            this.data.body = "";
        }
        //assegurando que só vamos receber esses 2 atributos, visto que bancos NoSQL não tem travas nos atributos
        this.data = {
            title: this.data.title.trim(),
            body: this.data.body.trim(),
            author: ObjectID(this._id),
            createdDate: new Date()
        }
    }

    validate() {
        if(this.data.title == "")
        this.errors.push("Every post must have a title.")
        if(this.data.body == "")            
            this.errors.push("Every post must have content.")

    }


    create() {
        return new Promise(async (resolve,reject)=>{
            this.cleanEntry();
            this.validate();
            if(this.errors.length){
                reject(this.errors)
            } else {
                await postsCollection.insertOne({title:this.data.title,body: this.data.body,date: this.data.createdDate,author: new ObjectID(this._id)})
                resolve()
            }
        });
    }

   static findPost(id) {
        return new Promise(async (resolve,reject)=>{
            if(typeof(id) != "string" || !ObjectID.isValid(id)){
                reject();
                return
            }
            let postArray = await Post.PostQuery([
                {$match: {_id: new ObjectID(id)}}
            ]);
            if(postArray.length){
                console.log(postArray[0]);
                
                resolve(postArray[0]);
            } else {
                reject();
            }
        });
    }
    static PostQuery(match) {
        return new Promise(async (resolve,reject)=>{
            let aggOptions = match.concat([
                {$lookup: {from: "users",localField: "author", foreignField: "_id", as:"authorDocument"}},
                {$project: 
                        {title:1, 
                        body:1,
                        date:1, 
                        //repare que, geralmente authorDocument retorna um array, mas a gente manda só o primeiro objeto JSON de user porque sabemos que o nosso critério de busca só vai retornar um elemento de qualquer forma
                        author:{$arrayElemAt: ["$authorDocument",0]} 
                        }
                }]);
                console.log("aggopitons:" + aggOptions);
                
            //aggregate é um método que te permite fazer múltiplas consultas de acordo com múltiplos parâmetros, é uma busca mais complexa, como um join em SQL
            let postArray = await postsCollection.aggregate(
                /*a consulta em aggregate usa certos parâmetros, vamos explicar eles agora:
                $match é o critério de comparação, é ele quem determina quantos objetos da nossa configuração específica de busca vão aparecer
                $lookup é o parâmetro mais importante, é ele que define exatamente o porquê a nossa busca é específica
                o lookup possui por sua vez 4 parâmetros próprios:
                from: a collection que a nossa collection atual vai se juntar pra fazer a busca
                localField: a chave primaria, basicamente qual coluna será comparada
                foreignField: a chave estrangeira, que deverá por sua vez ser um campo da collection especificada no from, que contem o mesmo valor da nossa chave primaria
                as: é o nome que vc vai dar ao nome do array de objetos mistos que será retornado dessa consulta especial
                
                basicamente, o que o lookup retorna são os objetos da collection externa que passaram na condição de match

                $project é basicamente formatação, ele é opcional e define como será montado cada elemento do array definido no lookup(no "as:");
                */
            aggOptions).toArray();
            //como o authorDocument retorna o objeto inteiro de users, que contem a senha e email, vamos filtrar as informações sensíveis antes de mandar pra view.       
            postArray = postArray.map((post)=>{
                post.author = {
                    username: post.author.username,
                    avatar: new User(post.author,true).avatar //repare que new User é o objeto em si, ele não precisa ser guardado numa variável antes de fazer as operações sobre ele, só fazemos isso para ter referência do objeto depois
                }
                return post;
            });
            if(postArray.length){
                console.log(postArray[0]);
                
                resolve(postArray);
            } else {
                reject();
            }
        });
    }
    static findByAuthor(authorId) {
        return Post.PostQuery([
            {$match: {author: authorId}},
            {$sort: {date: -1}}
        ]);

    }
}


module.exports = Post;