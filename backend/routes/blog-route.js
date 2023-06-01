const express  = require('express');
const router = express.Router();
const blogfunctions = require('../controller/blog-controller');

router.get('/',blogfunctions.getAllBlogs);
router.post('/add',blogfunctions.addblog);
router.put('/update/:id',blogfunctions.updateblog);
router.get('/:id',blogfunctions.getblog);
router.delete('/:id',blogfunctions.deleteblog);
router.get('/user/:id',blogfunctions.getUserBlogs);

module.exports = router; 