const express = require('express')
const path = require("path")
const fs = require("fs")

const app = express()


app.use(function(req, res, next){
    console.log(`Request protocol: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    console.log(`Request ${req.method} made to ${req.url} at ${new Date()}`);
    next();
})

app.use(function(req, res, next){
    var filePath = path.join(__dirname, "static", req.url)
    fs.stat(filePath, function(err, fileInfo){
        if(err){
            next();
            return;
        }
        if(fileInfo.isFile()) res.sendFile(filePath)
        else next()
    })
})

app.use(function(req, res){
    res.status(404)
    res.send('File not found')
})







const port = process.env.PORT || 5000

app.listen(port, ()=>console.log(`Server started on port ${port}`))