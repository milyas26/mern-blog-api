const {validationResult} = require('express-validator');

exports.createBlogPost = (req, res, next) => {
    const {title, body} = req.body;
    // const image = req.body;

    const error = validationResult(req);

    if(!error.isEmpty()) {
        const err = new Error("Invalid Value");
        err.errorStatue = 400;
        err.data = error.array()
        throw err
    }

    const result = {
        message: "Create Blog Success!",
        data: {
            post_id: 1,
            title: title,
            image: "gambar.jpg",
            body: body,
            created_at: "12/10/2020",
            author: {
                uid: 1,
                name: "Nama Author"
            }
        }
    }

    res.status(201).json(result);
}