let express = require('express');
let adminRoute = express.Router();
let { MongoClient } = require('mongodb');
let debug = require('debug')("app:adminRoute");

let books = [
    {
        title:"Bello one boook",
        genre:'Comics',
        author:'clint',
        read: false
    },
    {
        title:"Bello one boook",
        genre:'Comics',
        author:'clint',
        read: false
    },
    {
        title:"Bello one boook",
        genre:'Comics',
        author:'clint',
        read: false
    },
    ];
function admin(){
    adminRoute.route('/')
    .get((req, res)=>{
        const url = "mongodb+srv://debian:D3b1an%21%3F@cluster0-drlyy.azure.mongodb.net/test?retryWrites=true&w=majority";
        const dbName = "spLibrary";
        (async function mongodb(){
            let client;
            try {
                client = await MongoClient.connect(url);
                debug("Connnecting to the server");

                const db = client.db(dbName);
                const response = await db.collection('books').insertMany(books);

                res.json(response);
            } catch (error) {
                debug(error);               
            }
            client.close();
        }());
    });
    return adminRoute;
}

module.exports = admin;