const {validationResult} = require('express-validator');
const BlogPost = require('../models/Blog');

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
        err.errorStatue = 422;
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

exports.getAllBlogPost = (req, res, next) => {
    BlogPost.find()
        .then(result => {
            res.status(200).json({
                message: "Data Blog Post berhasil dipanggil",
                data: result
            })
        })
        .catch(err => {
            next(err)
        })
}