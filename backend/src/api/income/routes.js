import { Router } from "express";
import controller  from "./controller";

const route = Router();

route.get('/v1/incomes', controller.listIncomes)
route.get('/v1/income/:id', controller.getIncomeById);
route.post('/v1/income', controller.insertIncome);
route.patch('/v1/income/:id', controller.updateIncomeById);
route.delete('/v1/income/:id', controller.deleteIncomeById);

export default route 