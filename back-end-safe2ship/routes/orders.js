const express = require('express');
const router = express.Router();

module.exports = ({
    postOrder,
    updateOrder,
}) => {
    router.post('/order/create', (req, res) => {
        postOrder(req.body)
            .then((order) => res.json(order))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    router.patch('/order/update', (req, res) => {
        updateOrder(read.body)
            .then((order) => {
                res.json(order);
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });

    return router;
};