const express = require('express')
const app = express()
const {products,people} = require('./data')


app.get('/',(req,res) => {
    res.send('<h1>Welcome!</h1><a href ="/api/products">Product</a>')
})
app.get('/api/products',(req,res)=>{
   const newProducts = products.map(product =>{
    const {id,name,image} = product
    return {id,name,image}
   })
   res.json(newProducts)
})
app.get('/api/products/:id',(req,res)=>{
    const id = req.params.id - 1
    res.json(products[id])
})
app.get('/api/v1/query',(req,res)=>{
    let sortedProducts = [...products]
    const {search, limit} = req.query
    if (search){
        sortedProducts = sortedProducts.filter(product => product.name.startsWith(search))
    }
    if (limit){
        sortedProducts = sortedProducts.slice(0,Number(limit))
    }
    if (sortedProducts.length > 1){
        res.status(200).json(sortedProducts)
    } else {
        res.status(200).send('no products matched your search')
    }
    
})

app.listen(5000,()=>{
    console.log('listening on port 5000');
})