import { MongoClient, ObjectID } from 'mongodb'
import { updateSet  } from '../../utils/transactions'

const uri = `mongodb://localhost:${process.env.DBPORT}/${process.env.DBNAME}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}

let connection, db, collection;

const runDataBase = async () => {
    connection = await MongoClient.connect(uri, options);
    db = await connection.db(process.env.DBNAME);
    collection = db.collection("incomes");
};

const getAllIncomes = async () => {
    try {
     
        await runDataBase();
        const allIncomes =  await collection.find({}).toArray();
        return allIncomes;
        
    } catch (error) {
        throw error;
        
    } finally {
        await connection.close();
    };
}

const getIncomeById = async (id) => {

    const filter = {"_id" :ObjectID(id)}

    try {
     
        await runDataBase();
        const income =  await collection.find(filter).toArray();
        return income;
        
    } catch (error) {
        throw error;
        
    } finally {
        await connection.close();
    };
}


const inserIncome = async (payload) => {
    try {
     
        await runDataBase();
        await collection.insert(payload);
        
    } catch (error) {
        throw error;
        
    } finally {
        await connection.close();
    };
};

const updateIncome = async (id, payload) => {
    const filter = {"_id" :ObjectID(id)};
    const updateDocument = updateSet(payload)
    
    try {
        
        await runDataBase();
        const update = await collection.updateOne(filter, updateDocument);
        return update
        
    } catch (error) {
        throw error;

    } finally {
        await connection.close();
    };
};

const deleteIncomeById = async (id) => {
    const filter = {"_id" :ObjectID(id)};

    try {
        
        await runDataBase();
        await collection.deleteOne(filter);
        
    } catch (error) {
        throw error;
        
    } finally {
        await connection.close();
    };   
};

const transactions = { inserIncome, updateIncome, deleteIncomeById, getAllIncomes, getIncomeById }

export default transactions
