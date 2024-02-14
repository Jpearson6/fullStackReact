const logger = require('./logger')
const _ = require('lodash')
const dummy = (blogs) => {
    return 1;
}
const totalLikes = (blogs) => {
    return blogs.length == 0
    ? 0
    : blogs.reduce((sum , item) => {
        return sum + item.likes
    } , 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length ==0 
    ? 0
    : blogs.reduce((favorite , blog) => {
        return (favorite && favorite.likes > blog.likes) ? favorite : {
            author: blog.author,
            title: blog.title,
            likes: blog.likes
        }
    }, null)
}

const mostBlogs = (blogs) => {
    let groupedBlogs = _.groupBy(blogs , 'author')
    let mostBlogs = _.reduce(groupedBlogs , (prev , next) => {
        return ( prev && prev['blogs'] > next.length ) ? prev : {
            author: next[0]['author'],
            blogs: next.length
        }
    }, null)
    return mostBlogs
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }