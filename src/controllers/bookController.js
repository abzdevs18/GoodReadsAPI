let debug = require('debug')('app:bookController');
let { MongoClient, ObjectID } = require('mongodb');

function bookController(bookService, nav){
    function getIndex(req, res){
        (async function query(){
          const url = "mongodb+srv://debian:D3b1an%21%3F@cluster0-drlyy.azure.mongodb.net/test?retryWrites=true&w=majority";
          const dbName = "spLibrary";

          try {
            let client;
              
            client = await MongoClient.connect(url);
            debug("Connnecting to the server");

            const db = client.db(dbName);
            const col = await db.collection('books');
            const books = await col.find().toArray();

            res.render('bookListView',{
                nav,
                title:'Book Page',
                books: books
            });
          
          } catch (error) {
            debug(error.stack);
          }
            // .then(result => {
                // debug(result);
            // });
        }());
        
    }

    function getById(req, res){
        (async function query(){
            let { id } = req.params;
            const url = "mongodb+srv://debian:D3b1an%21%3F@cluster0-drlyy.azure.mongodb.net/test?retryWrites=true&w=majority";
            const dbName = "spLibrary";

            (async function books(){
              try {
                let client;
                client = await MongoClient.connect(url);
                debug("Selecting single book");

                const db = client.db(dbName);
                const col = await db.collection('books');
                const singleBook = await col.findOne({_id:new ObjectID(id)});

                singleBook.details = await bookService.getBookById(singleBook.bookId)

                res.render('bookView',{
                    nav,
                    title:'Single Book',
                    book: singleBook
                });
              } catch (error) {
                debug(error.stack);
              }
            }());
        }());
    }

    function middleWare(req, res, next) {
      // if(req.user){
        next();
      // }else{
      //   res.redirect('/');
      // }
    }
    // refilling module patter
    return {
        getIndex,
        getById,
        middleWare
    };
}

module.exports = bookController;