import mongoose from 'mongoose';
import transactionModel from './transaction_model.js'

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_CONNECTION;
db.transaction = transactionModel(mongoose);
export { db };
