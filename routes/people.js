const express = require('express');
const router = express.Router();

const {people} = require('../data')
router.post('/',(req,res)=>{
    const {name} = req.body
    if (!name) {
        return res.status(404).json({success:false,msg:'please enter a name'})
    }
    res.status(201).json({success:true,person:name})
})
router.get('/',(req,res)=>{
    res.status(200).json({success:true,data:people})
})
router.post('/postman',(req, res) => {
    const {name} = req.body
    if (!name) {
        return res.status(404).json({success:false,msg:'please enter a name'})
    }
    res.status(201).send({success:true,data:[...people,name]})
})
router.put('/:id',(req, res)=> {
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


router.delete('/:id',(req, res)=>{
    const {id} = req.params
    const person = people.find(person => person.id === Number(id))
    if (!person){
        return res.status(404).json({success:false, message:'no person found to delete'})
    }
    const newPeople = people.filter(person=> person.id !== Number(id))

    res.status(200).json({success:true, data:newPeople})
})

module.exports = router