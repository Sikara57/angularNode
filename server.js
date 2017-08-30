var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Eleve= require('./models/eleve.js');
var app = express();

//connexion db
var promise=mongoose.connect('mongodb://localhost:27017/ifa',{
    useMongoClient:true,
});

//quand la connexion est réussie
promise.then(function(db){
    console.log('db.connected');
    app.listen(3000, function() {
        console.log('listening on 3000 and database is connected');
    });

});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.set('views','./views');
app.set('view engine','jade');
app.use('/app', express.static('./app/'));


// app.use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/liste', function(req, res) {
    Eleve.find({},function(err, collection){
        if(err){
            console.log(err);
            return res.send(500);
        }
        else {
            
            res.send(collection);
        }
    });
});

app.get('/api/liste/:id', function(req, res) {
    // console.log(req.params.id);
    Eleve.findOne({"_id": req.params.id}, function(err,objet){
        if(err){
            console.log(err);
            return res.send(500);
        }
        else {
            return res.send(objet);
        }
    });
});

app.post('/api/liste',function(req,res){
    var newUser= new Eleve(req.body.eleve);
    // console.log(req.body.eleve);
    console.log(newUser);
    newUser.save(function(err,objet){
        if(err){
            console.log(err);
            return res.send(500);
        }else {
            console.log(objet);
            res.send(objet);
        }
    });
});

app.delete('/api/liste/:id', function(req,res){
    // console.log('deleted');
    Eleve.findByIdAndRemove({"_id": req.params.id}, function(err,objet){
        if(err){
            console.log(err);
            return res.send(500);
        }else{
            console.log(res);
            console.log("deleted");
            res.send(200);
        }
    });
});

app.put('/api/liste/:id',function(req,res){
    console.log('updated');
    console.log(req.body);
    Eleve.findByIdAndUpdate(req.params.id,req.body, { new: true }, function (err, updatedEleve) {
        if (err) return handleError(err);
        console.log(updatedEleve);
        res.status(200).send(updatedEleve);});
});
