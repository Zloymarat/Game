const express = require('express');
const Datastore = require('nedb');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

const db = new Datastore({ filename: '.data/db', autoload: true });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/info', (req, res) => {
    db.find({},(err, docs) => {
        res.send(JSON.stringify(docs))
    })  
});

app.get('/top', (req, res) => {
    db.find({}).sort({score: 1}).limit(req.params.n).exec((err, docs) => {
        res.send({"top": JSON.stringify(docs)});
});
});

app.post('/save',(req, res) => {
    let username = req.body.name;
    let score = parseInt(rec.body.score);

    db.insert({username: "Bot", score: 120}, (err, newDoc) => {   
        console.log("New player added to db");
 }); 
});

app.listen(port, () => {
    console.log("server is listening on port 8000");
});

