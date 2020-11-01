import express from 'express';
import cors from "cors";

import { config }from 'dotenv';
import { json } from 'body-parser';

import income from './api/income/routes'

import mongoConnection from './config/db-connection'

const app = express()
config()

app.use(cors())
app.use(json())
app.use(income)
app.listen(process.env.PORT, () => console.log(`START API-SERVER! http://localhost:${process.env.PORT}`));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoConnection().then(() => console.log('START DB-SERVER!'))