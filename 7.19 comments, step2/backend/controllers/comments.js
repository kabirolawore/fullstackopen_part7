const commentsRouter = require("express").Router();
const Comment = require("../models/comment");
const Blog = require("../models/blog");

commentsRouter.post("/", async (request, response, next) => {
  try {
    //
    const { comment, blogId } = request.body;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return response.status(404).json({ error: "Blog not found!" });
    }

    const content = new Comment({ comment, blogId });

    if (comment) {
      const savedComment = await content.save();

      blog.comments = blog.comments.concat(savedComment._id);
      await blog.save();

      response.status(201).json(savedComment);
    } else response.status(404).end();
  } catch (exception) {
    next(exception);
  }
});

commentsRouter.get("/", async (_request, response) => {
  const comments = await Comment.find({});

  response.json(comments);
});

module.exports = commentsRouter;
