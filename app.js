const express = require('express')
const logger = require('./logger')
const authorize = require('./authorize')
const app = express()

// req => middleware => res
// app.use([logger,authorize])
// app.use(express.static('./public'))
app.get('/',(req, res) => {
    res.send('Home')
})
app.get('/about', (req, res)=>{
    res.send('About')
})
app.get('/api/products',[logger,authorize] ,(req, res)=>{
    console.log(req.user)
    res.send('products')
});
app.listen(5000,()=>{
    console.log('listening on port 5000');
})