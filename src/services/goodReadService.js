const axios = require('axios');
const xmljs = require('xml2js');

const debug = require('debug')('app:goodReadService');

const parser = xmljs.Parser({explicitArray: false});

function goodReadService(){
    function getBookById(id){
        return new Promise((resolve, reject)=>{
             axios.get('https://www.goodreads.com/book/isbn/0441172717?key=9ty2IZQgI9LvOpEIbq67Q')
             .then((response)=>{
                parser.parseString(response.data, (err, result)=>{
                    if(err){
                        debug(err);
                    }else {
                        debug(result);
                        resolve(result.GoodreadsResponse.book);
                    }
                });
             })
             .catch((error)=>{
                 reject(error);
                 debug(error);
             });
        })
    }

    return { getBookById };
}

module.exports = goodReadService();