exports.createProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    res.json({
        message: "Create Product Success!",
        data: {
            id: 1,
            name: name,
            price: price
        }
    })
    next();
}

exports.getAllProducts = (req, res, next) => {
    res.json({
        message: "Get All Products Success!",
        data: [
        {
            id: 1,
            name: "Tesla Model X",
            price: 2435000000
        },
        {
            id: 2,
            name: "Lenovo Ideapad S340",
            price: 9500000
        }, 
        {
            id: 3,
            name: "Samsung A71",
            price: 6500000
        }]
    })
    next();
}