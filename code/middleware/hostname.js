module.exports = function auth(req, res, next){

    /*if(req.headers.host != "localhost:3000"){
        return res.status(403).send('Access denied.');  
    }*/
    next();
}
