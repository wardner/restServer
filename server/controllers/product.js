const express = require('express');
const Product = require('../models/product');

const app = express();

app.get('/product', (req, res) => {

    let since = req.query.since || 0;
    since = Number(since);
    let limit = req.query.limit || 10;
    limit = Number(limit);

    Product.find({})
        .skip(since)
        .limit(limit)
        .exec((err, products) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Product.countDocuments({}, (err, counts) => {
                res.status(200).json({
                    ok: true,
                    products,
                    count: counts
                });
            });

        });

});

//Buscar Un Producto por codigo
app.get('/product/:barcode', (req, res) => {

    let barcode = req.params.barcode;

    Product.findOne({ barcode })
        .exec((err, product) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!product) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'Producto no encontrado'
                    }
                });
            }

            res.status(200).json({
                ok: true,
                product
            });

        });

});

app.post('/product', (req, res) => {

    let body = req.body;

    let product = new Product({
        barcode: body.barcode,
        name: body.name,
        price: body.price,
        description: body.description
    });

    product.save((err, productDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            product: productDB
        });

    });

});

app.put('/product/:barcode', (req, res) => {

    let barcode = req.params.barcode;
    let body = req.body;

    Product.findOneAndUpdate({ barcode }, body, { new: true, runValidators: true }, (err, productDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        res.status(200).json({
            ok: true,
            product: productDB
        });

    });

});

app.delete('/product/:barcode', (req, res) => {

    let barcode = req.params.barcode;

    Product.findOneAndRemove({ barcode }, (err, deletedProduct) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!deletedProduct) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        res.status(200).json({
            ok: true,
            product: deletedProduct
        });

    });


});


module.exports = app;