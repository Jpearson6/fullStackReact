const blogRouter = require('express').Router()
const Blog = require('../models/blogs')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).send()
})

blogRouter.put('/:id', async (request, response) => {
    //console.log(request.body)
    updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
    )
    if (!updatedBlog) {
        return response.status(404).send("Blog not found");
    }
    response.status(204).send()
})

module.exports = blogRouter