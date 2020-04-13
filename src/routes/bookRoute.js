let express = require('express');
let sql = require('mssql');
let debug = require('debug')('app:bookRoute')

let bookRoute = express.Router();
function router(nav){
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
        
        
        bookRoute.route('/')
            .get((req,res)=>{
                (async function query(){
                    const request = new sql.Request();
                    const { recordset } = await request.query("select * from books");
                    // .then(result => {
                        // debug(result);
                        res.render('bookListView',{
                            nav,
                            title:'Book Page',
                            books: recordset
                        });
                    // });
                }());
            });
        bookRoute.route('/:id')
        .all((req, res, next)=>{
            (async function query(){
                const request = new sql.Request();
                let { id } = req.params;

                const { recordset } = await request
                .input('id',sql.Int ,id)
                .query('select * from books WHERE id = @id');

                [req.books] = recordset;
                next();
            }());
        })
        .get((req,res)=>{
            res.render('bookView',{
                nav,
                title:'Single Book',
                book: req.books
            });
        });

        return bookRoute;        
}
module.exports = router;