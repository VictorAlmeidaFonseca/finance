import { Router } from "express";
import controller  from "./controller";

const route = Router();

route.get('/v1/expenses', controller.listExpenses)
route.get('/v1/expense/:id', controller.getExpenseById);
route.post('/v1/expense', controller.insertExpense);
route.patch('/v1/expense/:id', controller.updateExpenseById);
route.delete('/v1/expense/:id', controller.deleteExpenseById);

export default route 