import { db } from '../models/index.js';
//import { logger } from '../config/logger.js';

const Transaction = db.transaction;


/**
 * Rota raiz
 */

const rotaRaiz = async (req, res) => {
  try {
    res.send({
      message:
        'Bem-vindo à API de lançamentos. Acesse /transaction e siga as orientações',
    });

  } catch (error) {
    res.status(400).send({ message: 'Erro ao pesquisar rota' })
  }
}


const create = async (req, res) => {

  const transaction = new Transaction({
    description: req.body.description,
    value: req.body.value,
    category: req.body.category,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    yearMonth: req.body.yearMonth,
    yearMonthDay: req.body.yearMonthDay,
    type: req.body.type

  })
  try {
    await transaction.save(transaction)
    res.send({ message: "Transação salva com sucesso!" });
    //   logger.info(`POST /transaction - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    //    logger.error(`POST /transaction - ${JSON.stringify(error.message)}`);
  }
};



const findAll = async (req, res) => {
  const name = req.query.name;
  const period = req.query.period;

  //condicao para o filtro no findAll
  var condition = "";
  if (name) {
    condition = name
      ? { description: { $regex: new RegExp(name), $options: 'i' } }
      : {};
  }
  if (period) {
    condition = { yearMonth: period }
    console.log(condition)
  }

  try {
    const data = await Transaction.find(condition)
    res.send(data)
    //   logger.info(`GET /transaction`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    //   logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
  }
};



const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Transaction.findById({ _id: id })
    if (!data) {
      res.status(400).send(`Transaction ${id} não encontrado!`)
    } else {
      res.send(data);
    }
    //    logger.info(`GET /transaction - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Transaction id: ' + id });
    //   logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {

    const data = await Transaction.findByIdAndUpdade({ _id: id }, req.body, { new: true })

    if (!data) {
      res.status(400).send(`Transaction ${id} não encontrado para atualização!`)
    } else {
      res.send({ message: `Transaction ${id} atualizado com sucesso` });
    }

    //  logger.info(`PUT /transaction - ${id} - ${JSON.stringify(req.body)}`);

  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Transaction id: ' + id });
    //   logger.error(`PUT /transaction - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Transaction.findByIdAndDelete({ _id: id })

    if (!data) {
      res.status(400).send(`Transaction ${id} não encontrado para remover!`)
    } else {
      res.send({ message: `Transaction ${id} removido com sucesso` });
    };

    //   logger.info(`DELETE /transaction - ${id}`);

  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Transaction id: ' + id });
    //  logger.error(`DELETE /transaction - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  const id = req.params.id;

  try {

    const data = await Transaction.deleteMany()

    if (!data) {
      res.status(400).send(`Transacoes não encontrado para remover!`)
    } else {
      res.send({ message: `Transacoes removidos com sucesso!!` });
    };

    //   logger.info(`DELETE /transaction`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Transacoes' });
    //   logger.error(`DELETE /transaction - ${JSON.stringify(error.message)}`);
  }
};

export default { rotaRaiz, create, findAll, findOne, update, remove, removeAll }
