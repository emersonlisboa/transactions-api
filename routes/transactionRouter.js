import express from 'express';
import controller from '../controllers/transactionController.js';

const app = express();


app.post('/api/transaction/', controller.create);
app.get('/api/transaction/', controller.findAll);
app.get('/api/transaction/:id', controller.findOne);
app.put('/api/transaction/:id', controller.update);
app.delete('/api/transaction/:id', controller.remove);
app.delete('/api/transaction/', controller.removeAll);

export { app as transactionRouter };
