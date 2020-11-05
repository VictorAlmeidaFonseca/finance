import transactions from './transactions';
import middlewares from './middlewares';

const listExpenses = async (req, res) => {
    
    try {
       const list = await transactions.getAllExpenses();
       return res.status(200).json(list)
        
    } catch (error) {
        const resError = error.stack || error;
        return res.status(400).json(resError)

    };  
};

const getExpenseById = async (req, res) => {
    const { id } =  req.params

    try {
      const expense = await transactions.getExpenseById(id);
      return res.status(200).json(expense);
        
    } catch (error) {
        const resError = error.stack || error;
        return res.status(400).json(resError);        
    };
};

const insertExpense = async (req, res) => {
    
    try {
      const insert = await middlewares.validadeRequest(req);
      const newExpense = await transactions.inserExpense(insert);
        return res.status(200).json(newExpense);
        
    } catch (error) {
        const resError = error.stack || error;
         return res.status(400).json(resError);        
    };
};

const updateExpenseById = async (req, res) => {
    const { id } =  req.params

    try {       
       const update = await middlewares.validadeRequest(req); 
       const updateExpense = await transactions.updateExpense(id, update)
       return res.status(200).json(updateExpense);
        
    } catch (error) {
        const resError = error.stack || error;
        return res.status(400).json(resError);    
    };
};

const deleteExpenseById = async (req, res) => {
    const { id } =  req.params

    try {
      
        await transactions.deleteExpenseById(id)
        return res.status(200).json(`Expense with id: ${id} were deleted`);
        
    } catch (error) {
        const resError = error.stack || error;
        return res.status(400).json(resError);    
    };
};

const controller = { listExpenses , getExpenseById , insertExpense, updateExpenseById , deleteExpenseById  }

export default controller;
