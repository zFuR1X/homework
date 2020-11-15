const MongoClient = require('mongodb').MongoClient;
const express = require("express");
const bodyParser = require("body-parser")

const uri = "mongodb+srv://Login:kamin123456789@cluster0.katdh.mongodb.net/db_duck?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true }, { useNewUrlParser: true });

let app = express();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

    app.use(express.static("../client"))

    let database;
    app.post("/enroll", urlencodedParser, function(request, response){
        let reqcords = database.collection("records");
        reqcords.insertOne({
            name: request.body.firstname,
            second_name: request.body.lastname,
        }, function(err, result) {
            if (err) console.log(err.stack);
            response.redirect("../records.html")
        })
    });


    app.get("/records", function(request, response){
        let reqcords = database.collection("records");

        reqcords.find().toArray(function(err, documents) {
            if (err) console.log(err.stack);
            
            if(documents.length>0){
            response.send(JSON.stringify(documents));
            }
        })
        
    })

client.connect(err => {

    database = client.db("db_duck")
    /*const collection = client.db("db_duck").collection("records");
    collection.insertOne({
        name: "Test name",
        second_name: "Test second name",
    }, function(err, result) {
        if (err) console.log(err.stack);
    })


    collection.find().toArray(function(err, documents) {
        if (err) console.log(err.stack);
        
        for( let i = 0; i < documents.length; i++ ) {
            console.log(documents[i].name, documents[i].second_name)
        }
    })*/
    app.listen(591)
});