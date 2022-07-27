const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;


// middleware

app.use(cors());
app.use(express.json());

// mongodb connected

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4za0g.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const carsCollection = client.db('car-service').collection('car-Items');
        const expertCollection = client.db('car-service').collection('experts');
      console.log('connected')

    //  cars in get 
      app.get("/cars" , async (req,res) => {
        const query = {};
        const cursor = carsCollection.find(query);
        const cars = await cursor.toArray();
        res.send(cars);
    });


    // cars id find

    app.get('/cars/:id' , async (req,res) => {
        const id = req.params.id;
        const query = {_id : ObjectId(id)};
        const result = await carsCollection.findOne(query);
        res.send(result);
    })
      
  //  experts in get 
  app.get("/experts" , async (req,res) => {
    const query = {};
    const cursor = expertCollection.find(query);
    const cars = await cursor.toArray();
    res.send(cars);
})
  
    } finally {
   
      //await client.close();
    }
  }
  run().catch(console.dir);








app.get('/', (req, res) => {
    res.send('Car Services!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

//   
//   