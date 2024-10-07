const express = require('express');
const app = express();
const port = 3000;
const {Item} = require('./models')
const dateFormat = require('./helpers/dateFormat');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) => {
    try {
        let items = await Item.findAll();
        res.render('Home', {items, dateFormat});
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
        console.log(error, "<<<<");
        if (error.name === "SequelizeValidationError") {
            let errors = error.errors.map(e => e.message)
            res.send(errors);
        }
        res.send(error.message)
    }
})

app.listen(port, () => {
    console.log(`This app is listening on port: ${port}`);
});
