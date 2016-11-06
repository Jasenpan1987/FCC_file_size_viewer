var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();

var storage = multer.memoryStorage()
var upload = multer({ storage: storage }).single('photo');

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './index.html'))
});

app.post('/upload', function(req, res){
    upload(req, res, function(err) {
        if(err) {
            console.log('Error Occured');
            return;
        }
        res.send({
            fieldname: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            size: req.file.size
        })
    })
});

var port = process.env.PORT || 8080;
//error handling middleware
app.use(function(req, res) {
    res.status(404).send({
        error: "resource not found!!!"
    })
});

app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});