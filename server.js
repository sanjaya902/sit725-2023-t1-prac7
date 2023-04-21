var express = require('express');
var app = express();
const {MongoClient} = require ('mongodb');
const uri = 'mongodb+srv://admin:admin@cluster0.2ggyt9o.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
let dbCollection;

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function dbConnection(collectionName) {
    client.connect(err => {
        dbCollection = client.db().collection(collectionName);
        if (!err) {
            console.log('DB Connected');
            console.log(dbCollection);
        } else 
            console.error(err);
    });
}

app.post('/api/nature', (req, res) => {
    let nature = req.body;
    insert(nature, (err, result) => {
        if (err) {
            res.json({statusCode: 400, message: err});
        } else {
            res.json({statusCode: 200, data: result, message: 'successfully Added'});
        }
    });
});

app.get('/api/nature', (req,res) => {
    getAllNature((err, result) => {
        if (err) {
            res.json({statusCode: 400, message: err});
        } else {
            res.json({statusCode: 200, data: result, message: 'successful'});
        }
    });
})

function insert(nature, callback) {
    dbCollection.insertOne(nature, callback);
}

function getAllNature(callback) {
    dbCollection.find().toArray(callback);
}

var port = process.env.port || 3000;
app.listen(port, ()=>{
    console.log('App listening to: '+port)
    dbConnection('Nature');
})