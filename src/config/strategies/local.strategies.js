let passport = require('passport');
let { Strategy } = require("passport-local");
let { MongoClient } = require('mongodb');

let debug = require('debug')('app:local.strategies');

module.exports = function localStrategy(){
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done)=>{
            
            const url = "mongodb+srv://debian:D3b1an%21%3F@cluster0-drlyy.azure.mongodb.net/test?retryWrites=true&w=majority";
            const dbName = "spLibrary";
            (async function mongo(){
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug("COnnect");
                    const db = client.db(dbName);
                    const col = db.collection('user');

                    const user = await col.findOne({username});

                    if(user.password === password){
                        done(null, user);
                    }else{
                        done(null, false);
                    }

                } catch (error) {
                    debug(error.stack);
                } 
                client.close();
            }());
        }
    ));
}