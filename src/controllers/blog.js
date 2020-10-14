const {validationResult} = require('express-validator');
const BlogPost = require('../models/Blog');
const { post } = require('../routes/auth');
const path = require('path');
const fs = require('fs');
const Blog = require('../models/Blog');
const { parse } = require('path');

//CREATE BLOG POST
exports.createBlogPost = (req, res, next) => {
    
    const error = validationResult(req);
    
    if(!error.isEmpty()) {
        const err = new Error("Invalid Value");
        err.errorStatue = 400;
        err.data = error.array()
        throw err
    }
    
    if(!req.file) {
        const err = new Error("Pilih gambar terlebih dahulu");
        err.errorStatus = 422;
        throw err
    }

    const {title, body} = req.body;
    const image = req.file.path;

    const Posting = new BlogPost({
        title: title,
        body: body,
        image: image,
        author: {
            id: 1,
            name: "Muhammad Ilyas"
        }
    })

    Posting.save()
        .then(result => {
            res.status(201).json({
                message: "Create Blog Success!",
                data: result
            });
        })
        .catch(err => {
            console.log('err: ', err)
        })

}

//READ ALL BLOG POST
exports.getAllBlogPost = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItems;

    BlogPost.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            return BlogPost.find()
                .skip((parseInt(currentPage) - 1) * parseInt(perPage))
                .limit(parseInt(perPage))
        })
        .then(result => {
            res.status(200).json({
                message: "Data Blog Post berhasil dipanggil",
                data: result,
                total_data: totalItems,
                per_page: parseInt(perPage),
                current_page: parseInt(currentPage)
            })
        })
        .catch(err => {
            next(err)
        })
}

//READ BLOG POST BY ID
exports.getBlogPostById = (req, res, next) => {
    const postId = req.params.postId;
    BlogPost.findById(postId)
        .then(result => {
            if(!result) {
                const error = new Error(`Data blog dengan id ${postId} tidak ditemukan`)
                error.errorStatus = 404;
                throw error;
            } else {
                res.status(200).json({
                    message: `Data post dengan id ${postId} berhasil dipanggil`,
                    data: result
                })
            }
        })
        .catch(err => {
            next(err);
        })
}
//UPDATE
exports.updateBlogPost = (req, res, next) => {
    const error = validationResult(req);
    
    if(!error.isEmpty()) {
        const err = new Error("Invalid Value");
        err.errorStatus = 400;
        err.data = error.array()
        throw err
    }
    
    if(!req.file) {
        const err = new Error("Pilih gambar terlebih dahulu");
        err.errorStatus = 422;
        throw err
    }

    const {title, body} = req.body;
    const image = req.file.path;
    const postId = req.params.postId;

    BlogPost.findById(postId)
        .then(post => {
            if(!post) {
                const err = new Error('Blog post tidak ditemukan!')
                err.errorStatus = 404;
                throw err;
            }

            post.title = title;
            post.body = body;
            post.image = image;

            return post.save();
        })
        .then(result => {
            res.status(200).json({
                message: "Update blog post sukses",
                data: result
            })
        })
        .catch(err => {
            next(err);
        })
}

//DELETE
exports.deleteBlogPost = (req, res, next) => {
    const postId = req.params.postId;

    BlogPost.findById(postId)
        .then(post => {
            if(!post) {
                const error = new Error(`Data blog tidak ditemukan`)
                error.errorStatus = 404;
                throw error;
            }

            removeImage(post.image);
            return BlogPost.findByIdAndRemove(postId)
        })
        .then(result => {
            res.status(200).json({
                message: "Hapus berhasil",
                data: result
            })
        })
        .catch(err => {
            next(err);
        })
}

const removeImage = (filePath) => {
    filePath = path.join(__dirname, '../..', filePath);
    fs.unlink(filePath, err => console.log(err));
}