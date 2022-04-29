const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
// use middleware
app.use(cors());
app.use(express());

app.get('/', (req, res) => {
    res.send('comfort furniture server is running');
})

app.listen(port, () => {
    console.log('server is running');
})