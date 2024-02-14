const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blogs')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned correctly', async () => {

  const response = await api.get('/api/blogs')
  .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a valid Blog can be added', async () => {
  const newBlog = {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await helper.blogsInDb()
  expect(response).toHaveLength(helper.initialBlogs.length + 1)
})

test('unique identifier is id' , async () => {
  const blogs = await api.get('/api/blogs')
  blogs.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
  })
})

test('a valid Blog can be deleted', async () => {


  await api
    .delete('/api/blogs/5a422a851b54a676234d17f7')
    .expect(204)

  const blogsAfterDelete = await helper.blogsInDb()

  expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length - 1)
}, 10000)

test('a valid Blog can be updated', async () => {
  const updatedBlog = {
    _id: "5a422b3a1b54a676234d17f9",
    likes: 22
  }

  await api
    .put('/api/blogs/5a422b3a1b54a676234d17f9')
    .send(updatedBlog)
    .expect(204)

  const response = await helper.blogsInDb()

  const tempBlog = response.reduce((prev , next) => {
    //console.log("prev:" , prev , "next: " , next.id);
    return (prev && prev['id'] == '5a422b3a1b54a676234d17f9') ? prev : next
  })

  expect(tempBlog.likes).toEqual(22)
  expect(response).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
