const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
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
            res.send('{ "response": "users created successfully"}')
        })
    })

    app.get('/api/login', (req, res) => {
        console.log(req.query)
        db.collection('users').find(req.query).toArray(function (err, results) {
            console.log(results)
            if (results.length > 0) {
                res.send(results[0]['_id']);
            } else {
                res.send('{ "response": ""}');
            }
        })
    })

    app.get('/api/user/exist', (req, res) => {
        console.log(req.query)
        db.collection('users').find({ _id: ObjectId(req.query['id']) }).toArray(function (err, results) {
            console.log(results)
            if (results.length > 0) {
                res.send('{ "response": "exist"}');
            } else {
                res.send('{ "response": "not exist"}');
            }
        })
    })

    app.get('/api/user/info', (req, res) => {
        console.log(req.query)

        db.collection('users').find({ _id: ObjectId(req.query['id']) }).toArray(function (err, results) {
            console.log(results)
            if (results.length > 0) {
                res.send(results[0]);
            } else {
                res.send('{ "response": ""}');
            }
        })
    })

    app.post('/api/user/modify', (req, res) => {
        console.log(req.body)
        const dataUpdate = {
            $set: {
                login: req.body['login'],
                password: req.body['password'],
                age: req.body['age'],
                family: req.body['family'],
                role: req.body['role'],
                food: req.body['food']
            }
        }

        db.collection('users').updateOne({ _id: ObjectId(req.body['id']) }, dataUpdate, function (err, results) {
            if (err) throw err;

            res.send('{ "response": "Correctly Updated"}');
        })
    })

    app.get('/api/user/friends', (req, res) => {
        console.log(req.query)

        db.collection('users').find({ _id: ObjectId(req.query['id']) }).toArray(function (err, results) {
            console.log(results)
            console.log(results[0]['friends'])
            if (results.length > 0 && results[0]['friends'] != undefined) {
                res.send(results[0]['friends']);
            } else {
                res.send('{ "response": ""}');
            }
        })
    })

    app.get('/api/user/all', (req, res) => {
        console.log(req.query)

        db.collection('users').find().toArray(function (err, results) {
            console.log(results)
            if (results.length > 0) {
                let response = "[";
                for (const item in results) {
                    response += '{"id":"' + results[item]['_id'] + '","name":"' + results[item]['login'] + '"},'
                }
                response = response.substring(0, response.length -1)
                response += "]"
                res.send(response)
            } else {
                res.send('{ "response": ""}');
            }
        })
    })

    app.post('/api/user/modify/friends', (req, res) => {
        console.log(req.body)
        const dataUpdate = {
            $set: {
                friends: req.body['friends']
            }
        }

        db.collection('users').updateOne({ _id: ObjectId(req.body['id']) }, dataUpdate, function (err, results) {
            if (err) throw err;

            res.send('{ "response": "Correctly Updated"}');
        })
    })
});
