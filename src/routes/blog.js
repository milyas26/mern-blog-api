const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const blogController = require("../controllers/blog");

//CREATE BLOG POST
router.post(
  "/post",
    [
      body("title").isLength({ min: 5 }).withMessage("Input anda tidak sesuai"), 
      body("body").isLength({ min: 5 }).withMessage("Input anda tidak sesuai")
    ], blogController.createBlogPost);

//READ ALL BLOG POST
router.get('/posts', blogController.getAllBlogPost)

//READ BLOG POST BY ID
router.get('/post/:postId', blogController.getBlogPostById)

//UPDATE BLOG POST
router.put(
  '/post/:postId', 
  [
    body("title").isLength({ min: 5 }).withMessage("Input anda tidak sesuai"), 
    body("body").isLength({ min: 5 }).withMessage("Input anda tidak sesuai")
  ], blogController.updateBlogPost)
  
//DELETE BLOG POST
router.delete('/post/:postId', blogController.deleteBlogPost)

module.exports = router;