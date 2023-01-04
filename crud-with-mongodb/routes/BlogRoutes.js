const express = require("express");
const {
  getAllBlogs,
  createBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/BlogController");
 
const router = express.Router();
 
router.route("/").get(getAllBlogs).post(createBlogs);
router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);
 
module.exports = router;