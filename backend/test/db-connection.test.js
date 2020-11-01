import { MongoClient, ObjectID } from 'mongodb'

const uri = `mongodb://localhost:${process.env.DBPORT}/${process.env.DBNAME}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}
 
describe('insert', () => {
    let connection;
    let db;
  
    beforeAll(async () => {
      connection = await MongoClient.connect(uri, options);
      db = await connection.db('test');
    });

    it('should insert a doc into collection', async () => {
        const id = ObjectID()

        const users = db.collection('test');
      
        const mockUser = {_id: id, name: 'John'};
        await users.insertOne(mockUser);
      
        const insertedUser = await users.findOne({_id: ObjectID(id)});
        expect(insertedUser).toEqual(mockUser);
      });
  
    afterAll(async () => {
      await connection.close();
    });
});