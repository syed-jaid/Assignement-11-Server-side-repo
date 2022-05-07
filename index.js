const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = 5000


app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.h6zfo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const database = client.db('Allcards').collection('cards')

        // get data form database
        app.get('/cards', async (req, res) => {
            const query = {}
            const cursor = database.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        // get the data by id from database
        app.get('/card/:id', async (req, res) => {
            const id = req.params.id;
            const quary = { _id: ObjectId(id) }
            const card = await database.findOne(quary)
            res.send(card)
        })
        // delete single data from database 
        app.delete('/delete/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await database.deleteOne(query)
            res.send(result)
        })
        // updateing single data from database 
        app.put('/update/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const update = req.body
            console.log(update.quantity)
            const updateDoc = {
                $set: {
                    quantity: update.quantity,
                },

            };
            console.log(updateDoc)
            const result = await database.updateOne(filter, updateDoc, options)
            res.send(result)
        })
    } finally {

    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})