const express = require('express')

const app = express()


app.use(function(req, res, next){
    console.log(`Request protocol: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    console.log(`Request ${req.method} made to ${req.url} at ${new Date()}`);
    next();
})







const port = process.env.PORT || 5000

app.listen(port, ()=>console.log(`Server started on port ${port}`))