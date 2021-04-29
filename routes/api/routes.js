const express = require('express')

const mongodb = require('mongodb')
const url = 'mongodb+srv://Posey:posey@123@lessoncluster.pckqe.mongodb.net/lessons_database?retryWrites=true&w=majority'


const router = express.Router()

router.get('/', async (req, res)=>{
    const lessons = await loadLessonInfoCollection()
    res.send(await lessons.find({}).toArray())

    })

async function loadLessonInfoCollection(){
    const client = await mongodb.MongoClient.connect(url, {useNewUrlParser:true, useUnifiedTopology:true});
    
    return client.db('lessons_database').collection('lessons_information')
}

router.post('/order', async (req, res)=>{
    
    let lessons = await loadOrderInfoCollection()
  await lessons.insertOne(  {
      name:req.body.name,
     phone_number:req.body.phone_number,
  lessonsInformation:req.body.lessonsInformation
   
   })
  
  res.status(201).send()
  })


async function loadOrderInfoCollection(){
  const client = await mongodb.MongoClient.connect(url, {useNewUrlParser:true, useUnifiedTopology:true});
  
  return client.db('lessons_database').collection('order_information')
}
module.exports = router