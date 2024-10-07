const express = require('express');
const app = express();
const port = 3000;
const {Item} = require('./models')

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) => {
    try {
        let items = await Item.findAll();
        res.render('Home', {items});
    } catch (error) {
        res.send(error.message);
    }
});

app.post('/newItem', async (req, res) => {
    try {
        let {productName, price, description, quantity} = req.body;
        await Item.create({productName, price, description, quantity});
        res.redirect('/')
    } catch (error) {
        res.send(error)
    }
})

app.listen(port, () => {
    console.log(`This app is listening on port: ${port}`);
});
