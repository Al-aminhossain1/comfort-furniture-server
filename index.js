const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
// use middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s8o1a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productCollection = client.db('warehouse').collection('product');

        // Post Items
        app.post('/product/new', async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product)
            console.log('adding new product', product);
            res.send(result)

        })

        //    Get user: 
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const products = await productCollection.findOne(query);
            res.send(products)
        })


        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })


        app.put('/product/:id', async (req, res) => {
            const id = req.params.id;
            const deliveredProduct = req.body;
            console.log('product delivery success', deliveredProduct);
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    deliveredProduct
                },
            };
            const result = await productCollection.updateOne(filter, updateDoc, options);

            res.send(result)
        })

    }

    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('comfort furniture server is running');
})




app.listen(port, () => {
    console.log('server is running');
})