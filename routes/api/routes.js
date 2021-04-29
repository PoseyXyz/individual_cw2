const express = require('express')

const mongodb = require('mongodb')
const url = 'mongodb+srv://Posey:posey@123@lessoncluster.pckqe.mongodb.net/lessons_database?retryWrites=true&w=majority'


const router = express.Router()


async function loadLessonInfoCollection(){
    const client = await mongodb.MongoClient.connect(url, {useNewUrlParser:true, useUnifiedTopology:true});
    
    return client.db('lessons_database').collection('lessons_information')
}
module.exports = router