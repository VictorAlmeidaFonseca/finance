import { MongoClient, ObjectID } from 'mongodb'
import { updateSet } from '../../utils/transactions'
import dataTransformation from './data-transformation';

const uri = `mongodb://localhost:${process.env.DBPORT}/${process.env.DBNAME}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}

let connection, db, collection;

const runDataBase = async () => {
    connection = await MongoClient.connect(uri, options);
    db = await connection.db(process.env.DBNAME);
    collection = db.collection("expenses");
};

const getAllExpenses = async () => {
    try {    
        
        await runDataBase();
        const allExpense = await collection.find({}).toArray();
        return allExpense
        
    } catch (error) {
        throw error;
        
    } finally {
        await connection.close();
    };
}

const getExpenseById = async (id) => {

    const filter = {"_id" :ObjectID(id)}

    try {
     
        await runDataBase();
        const expense = await collection.find(filter).toArray();
        return  expense
        
    } catch (error) {
        throw error;
        
    } finally {
        await connection.close();
    };
}


const inserExpense = async (payload) => {
    try {     
        await runDataBase();
        const formatedPayload = await dataTransformation.newExpense(payload);
        await collection.insert(formatedPayload);
        
        return { success: true , payload };        
        
    } catch (error) {
        throw error;
        
    } finally {
        await connection.close();
    };
};

const updateExpense = async (id, payload) => {
    const filter = {"_id" : ObjectID(id)};
    const updateDocument = updateSet(payload)
    
    try {
        
        await runDataBase();
        await collection.updateOne(filter, updateDocument);
        
    } catch (error) {
        throw error;

    } finally {
        await connection.close();
    };
};

const deleteExpenseById = async (id) => {
    try {
        
        await runDataBase();
        await collection.deleteOne(id);
        
    } catch (error) {
        throw error;
        
    } finally {
        await connection.close();
    };   
};

const transactions = { inserExpense, updateExpense, deleteExpenseById, getAllExpenses, getExpenseById }

export default transactions
