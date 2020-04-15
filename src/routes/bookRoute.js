let express = require('express');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodReadService');

let bookRoute = express.Router();
function router(nav){
        const { getIndex, getById, middleWare } = bookController(bookService, nav);
  // This search as authentication if a user is login in order to view the books
        bookRoute.use(middleWare);
        bookRoute.route('/')
          .get(getIndex);
        bookRoute.route('/:id')
          .get(getById);

        return bookRoute;        
}
module.exports = router;