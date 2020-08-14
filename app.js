import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { transactionRouter } from './routes/transactionRouter.js';
import { db } from './models/index.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao banco de dados');
  } catch (error) {

    console.log(`Erro ao conectar no banco de dados! ${error}`);

    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'https://transactions-app.vercel.app/',
  
  })
);

app.use(transactionRouter);

app.get('/api/', (req, res) => {
  res.send({
    message:
      'Bem-vindo à API de lançamentos. Acesse /transaction e siga as orientações',
  });
});

app.listen(process.env.PORT || 8088, () => {
  console.log(`Servidor em execucao na porta ${process.env.PORT}`);
});
