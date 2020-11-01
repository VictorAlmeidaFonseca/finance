/* eslint-disable no-useless-catch */
import { MongoClient } from 'mongodb';

const uri = `mongodb://localhost:${process.env.DBPORT}/${process.env.DBNAME}`;

const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
};

const client = new MongoClient(uri, options);

const run = async () => client.connect();

export default run
