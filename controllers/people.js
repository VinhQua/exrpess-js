const getPeople = (req,res)=>{
    const {name} = req.body
    if (!name) {
        return res.status(404).json({success:false,msg:'please enter a name'})
    }
    res.status(201).json({success:true,person:name})
}