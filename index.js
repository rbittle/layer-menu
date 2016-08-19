'use strict';

var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var multer  = require('multer');
var path    = require('path');
var fs      = require('fs');
var bodyParser = require('body-parser');

var options = multer.diskStorage({
    destination: 'public/images/',
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

var upload = multer({storage: options}).single('file');
app.post('/upload', function(req, res){
    upload(req, res, function(err){
        res.status(500).send();
        return;
    });

    res.end('Upload Completed.');
});

app.get('/menuJson', function(req, res){
    res.sendFile(__dirname + '/public/layers.json');
});

app.post('/menuJson', function(req, res){
    try{
        fs.writeFile(__dirname + '/public/layers.json', JSON.stringify(req.body));
        res.end('Upload Completed.');
    }
    catch(err){
        res.status(500).send(err);
    }
});


io.on('connection', function(socket){
    socket.on('menuSend', function(data){
        io.emit('menuRecieve', data);
    });
});

io.on('disconnect', function(){

});

http.listen(8080, function(){
    console.log("listening on *:8080");
});
