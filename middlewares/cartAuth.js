module.exports = (req, res, next) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        return res.status(400).send('Invalid request');
    }

    if (quantity < 1) {
        return res.status(400).send('Quantity must be at least 1');
    }

    next();
};
