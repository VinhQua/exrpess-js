const authorize = (req,res,next)=>{
    const {user} = req.query;
    if (user=='cnn'){
        req.user ={name:'cnn',id:3}
        next()
    } else{
        res.status(401).send('Unauthenticated')
    }
}
module.exports = authorize