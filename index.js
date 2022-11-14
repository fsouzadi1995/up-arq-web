const express = require('express');
const app = express();
const PrismaClient = require('@prisma/client').PrismaClient;

const prismaClient = new PrismaClient();

app.use(express.json());

app.get('/api/currency', async (req, res) => {
  try {
    res.send(await prismaClient.currency.findMany());
  } catch (err) {
    res.status(500).send();
  }
});

app.get('/api/currency/:currencyId', async (req, res) => {
  const { currencyId } = req.params;
  try {
    const resource = await prismaClient.currency.findFirst({
      where: { id: +currencyId },
    });

    if (!resource) {
      res.status(404).send();
    }

    res.status(200).json(resource);
  } catch (err) {
    res.status(500).send();
  }
});

app.post('/api/currency', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send();
  }

  try {
    const resource = await prismaClient.currency.create({ data: { name } });

    res.status(200).json(resource);
  } catch (err) {
    res.status(500).send();
  }
});

app.patch('/api/currency/:currencyId', async (req, res) => {
  const { currencyId } = req.params;

  try {
    const currency = await prismaClient.currency.findFirst({
      where: { id: +currencyId },
    });

    if (!currency) {
      res.status(404).send();
    }

    const data = req.body;

    const resource = await prismaClient.currency.update({
      where: { id: +currencyId },
      data,
    });

    res.status(200).json(resource);
  } catch (ex) {
    console.log(ex);
    res.status(500).send();
  }
});

app.delete('/api/currency/:currencyId', async (req, res) => {
  const { currencyId } = req.params;

  try {
    await prismaClient.currency.delete({
      where: { id: +currencyId },
    });

    res.status(200).send();
  } catch (ex) {
    console.log(ex);
    res.status(500).send();
  }
});

app.post('/api/user/:userId/buy_currency/:currencyId', async (req, res) => {
  const { amount } = req.body;
  const userId = +req.params.userId;
  const currencyId = +req.params.currencyId;

  try {
    const currency = await prismaClient.currency.findFirst({
      where: { id: currencyId },
    });

    if (!currency) {
      return res.status(404).send();
    }

    const ars_holding = await prismaClient.holding.findFirst({
      where: { currencyId: 1, userId },
    });

    if (!ars_holding) {
      return res.status(403).send('not enough funds');
    }

    if (amount > ars_holding.amount) {
      return res.status(403).send('not enough funds');
    }

    await prismaClient.holding.update({
      where: { id: ars_holding.id },
      data: { amount: ars_holding.amount - amount },
    });

    const currency_holding = await prismaClient.holding.findFirst({
      where: { currencyId, userId },
    });

    if (!currency_holding) {
      await prismaClient.holding.create({
        data: { currencyId, userId, amount },
      });
    } else {
      await prismaClient.holding.update({
        where: { id: currency_holding.id },
        data: { amount: currency_holding.amount + amount },
      });
    }

    res.status(200).send();
  } catch (ex) {
    console.log(ex);
    return res.status(500).send();
  }
});

app.post(
  '/api/transfer/:currencyId/from/:fromUserId/to/:toUserId',
  async (req, res) => {
    const fromUserId = +req.params.fromUserId;
    const toUserId = +req.params.toUserId;
    const currencyId = +req.params.currencyId;
    const amount = +req.body.amount;

    try {
      if (fromUserId === toUserId) {
        return res.status(400).send('identical ids');
      }

      if (isNaN(amount)) {
        return res.status(400).send('not a number');
      }

      if (amount <= 0) {
        return res.status(400).send('amount has to be a positive integer');
      }

      const currency = await prismaClient.currency.findFirst({
        where: { id: currencyId },
      });

      if (!currency) {
        return res.status(404).send();
      }

      const fromUser = await prismaClient.user.findFirst({
        where: { id: fromUserId },
      });

      const toUser = await prismaClient.user.findFirst({
        where: { id: toUserId },
      });

      if (!fromUser || !toUser) {
        return res.status(404).send();
      }

      const fromUserHolding = await prismaClient.holding.findFirst({
        where: { userId: fromUserId, currencyId },
      });

      if (!fromUserHolding) {
        return res.status(403).send();
      }

      if (amount > fromUserHolding.amount) {
        return res.status(403).send();
      }

      await prismaClient.holding.update({
        where: { id: fromUserHolding.id },
        data: { amount: fromUserHolding.amount - amount },
      });

      const toUserHolding = await prismaClient.holding.findFirst({
        where: { userId: toUserId, currencyId },
      });

      if (!toUserHolding) {
        await prismaClient.holding.create({
          data: { userId: toUserId, currencyId, amount },
        });
      } else {
        await prismaClient.holding.update({
          where: { id: toUserHolding.id },
          data: { amount: toUserHolding.amount + amount },
        });
      }

      res.status(200).send();
    } catch (ex) {
      console.log(ex);
      return res.status(500).send();
    }
  }
);

app.get('/ping', (req, res) => res.send('pong'));

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
