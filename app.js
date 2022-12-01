import express from 'express'
import fs from 'fs/promises'
import launchPuppetter  from './scraper.js';

const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/movies', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(await launchPuppetter())
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})