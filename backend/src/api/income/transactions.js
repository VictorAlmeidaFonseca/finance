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
        await collection.find({});
        
    } catch (error) {
        throw error;
        
    } finally {
        await connection.close();
    };
}

const getIncomeById = async (id) => {

    const filter = ObjectID(id)

    try {
     
        await runDataBase();
        await collection.find(filter);
        
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
    const filter = ObjectID(id);
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

const deleteIncomeById = async (id) => {
    try {
        
        await runDataBase();
        await collection.deleteOne(id);
        
    } catch (error) {
        throw error;
        
    } finally {
        await connection.close();
    };   
};

const transactions = { inserIncome, updateIncome, deleteIncomeById, getAllIncomes, getIncomeById }

export default transactions
