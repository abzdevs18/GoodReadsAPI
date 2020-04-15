let express = require('express');
let { MongoClient } = require('mongodb');
let debug = require('debug')("app:authRoute");
let passport = require('passport');

const authRoute = express.Router();

function auth(nav){
    authRoute.route('/signup')
        .post((req, res)=>{
            const { username, password } = req.body;
            const url = "mongodb+srv://debian:D3b1an%21%3F@cluster0-drlyy.azure.mongodb.net/test?retryWrites=true&w=majority";
            const dbName = "spLibrary";
            ( async function addUser(){
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug("Connected to the server");

                    const db = client.db(dbName);

                    const col = db.collection('user');
                    const user = {username, password};

                    const result = await col.insertOne(user);
                    debug(result);

                    req.login(result.ops[0], () => {
                        res.redirect('/auth/profile');
                    });
                } catch (error) {
                }


            }());
            // debug(req.body);
            // create user 

            // res.json(req.body);

        });
    authRoute.route('/profile')
        .all((req, res, next) => {
            if(req.user){
                next();
            }else{
                res.redirect('/');
            }
        })
        .get((req, res)=>{
            res.json(req.user);
        });

    authRoute.route('/signin')
        .get((req, res)=>{
            res.render('signin',{
                nav,
                title: 'Sign In'
            });
        })
        .post(passport.authenticate('local',{
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));
    return authRoute;
}

module.exports = auth;