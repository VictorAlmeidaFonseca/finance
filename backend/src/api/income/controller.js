import transactions from './transactions';
import middlewares from './middlewares';

const listIncomes = async (req, res) => {
    
    try {
       const list = await transactions.getAllIncomes();
       return res.status(200).json(list)
        
    } catch (error) {
        const resError = error.stack || error;
        return res.status(400).json(resError)

    };  
};

const getIncomeById = async (req, res) => {
    const { id } =  req.params

    try {
      const income = await transactions.getIncomeById(id);
      return res.status(200).json(income);
        
    } catch (error) {
        const resError = error.stack || error;
        return res.status(400).json(resError);        
    }
};

const insertIncome = async (req, res) => {
    try {
      await middlewares.validadeRequest(req);
      const newIncome = await transactions.inserIncome(req);
      return res.status(200).json(newIncome);
        
    } catch (error) {
        const resError = error.stack || error;
         return res.status(400).json(resError);        
    }
};

const updateIncomeById = async (req, res) => {
    const { id } =  req.params

    try {
       
       await middlewares.validadeUpdateRequest(req); 
       const updateIncome = await transactions.updateIncome(id, req)
       return res.status(200).json(updateIncome);
        
    } catch (error) {
        const resError = error.stack || error;
        return res.status(400).json(resError);    
    }
};

const deleteIncomeById = async (req, res) => {
    const { id } =  req.params

    try {
     
        await transactions.deleteIncomeById(id)
        return res.status(200).json(`Income with id: ${id} were deleted`);
        
    } catch (error) {
        const resError = error.stack || error;
        return res.status(400).json(resError);    
    }
};

const controller = { listIncomes, getIncomeById, insertIncome, updateIncomeById, deleteIncomeById }

export default controller;
