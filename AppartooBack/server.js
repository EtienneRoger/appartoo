const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const app = express()

const uri = "mongodb+srv://admin:CWSgTM5RU7ILHcXD@appartoo-1zoz6.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });


client.connect(err => {
    let db = client.db("test");

    //set Port
    app.listen(3000, function () {
        console.log('listening on 3000')
    })

    //set CORS
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:4200");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json()); 

    app.get('/', function (req, res) {
        res.send('Hello World')
    })

    app.post('/api/add/user', (req, res) => {
        console.log(req.body)
        db.collection('users').save(req.body, (err, result) => {
            if (err) return console.log(err)

            console.log('saved to database')
            res.send('users created successfully')
        })
    })
});
