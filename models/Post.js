
const db = require("../db.js").getDb();
const postsCollection = db.collection("posts");

const ObjectID = require("mongodb").ObjectID;


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
                await postsCollection.insertOne({title:this.data.title,body: this.data.body,date: this.data.createdDate,author: this._id})
                resolve()
            }
        });
    }
}


module.exports = Post;