const express = require('express')
const {people} = require('./data')
const app = express()

// static assets
app.use(express.static('./methods-public'))
//parse form data
app.use(express.urlencoded({ extended: false }))
//parse json data
app.use(express.json())

app.get('/api/people',(req,res)=>{
    res.status(200).json({success:true,data:people})
})

app.post('/api/people',(req,res)=>{
    const {name} = req.body
    if (!name) {
        return res.status(404).json({success:false,msg:'please enter a name'})
    }
    res.status(201).json({success:true,person:name})
})
app.post('/api/postman/people',(req, res) => {
    const {name} = req.body
    if (!name) {
        return res.status(404).json({success:false,msg:'please enter a name'})
    }
    res.status(201).send({success:true,data:[...people,name]})
})
app.put('/api/people/:id',(req, res)=> {
    const {id} = req.params
    const {name} = req.body
    console.log(id,name)
    
    const person = people.find(person => person.id === Number(id))
    if (!person) {
        return res
                .status(404)
                .json({success:false,msg:'no person found'})
    }
    const newPeople = people.map(person =>{
        if (person.id === Number(id)) {
            person.name = name
        }
        return person
    })
    res.status(200).json({success:true,data:newPeople})
    

})
app.post('/login',(req,res)=>{
    console.log(req.body)
    const {name} = req.body
    if (name){
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send('Please provide credentials')
})

app.delete('/api/people/:id',(req, res)=>{
    const {id} = req.params
    const person = people.find(person => person.id === Number(id))
    if (!person){
        return res.status(404).json({success:false, message:'no person found to delete'})
    }
    const newPeople = people.filter(person=> person.id !== Number(id))

    res.status(200).json({success:true, data:newPeople})
})
app.listen(5000,()=>{
    console.log('listening on port 5000');
})