const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = 5000


app.use(express.json())
app.use(cors())



const uri = "mongodb+srv://database:GS1wVWfYiLdkHHVM@cluster0.h6zfo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
            console.log(result)
            res.send(result)
        })

    } finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})