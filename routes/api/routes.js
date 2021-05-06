const express = require('express')
const mongodb = require('mongodb')
const url = 'mongodb+srv://Posey:posey@123@lessoncluster.pckqe.mongodb.net/lessons_database?retryWrites=true&w=majority'

const router = express.Router()

router.get('/', async (req, res)=>{
    const lessons = await loadLessonInfoCollection()
    res.send(await lessons.find({}).toArray())

    })
    router.put("/", async (req, res) => {
        const lessons = await loadLessonInfoCollection()
        try {
          const writeOperations =  req.body.map((item)=>{
            return {
              updateOne:{
                filter:{id:item.id},
                update:{$set:{
                  id:item.id,
                  subject:item.subject,
                  location:item.location,
                  price:item.price,
                  spaces:item.spaces
                }
                }
              }
            }
          })
         await lessons.bulkWrite(writeOperations)
          res.status(202).send()        
         
        }catch (e){
          res.status(500).json({message:"Something went wrong"})
          console.log(e);
        }          
      
      });    

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