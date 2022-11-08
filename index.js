const express = require('express');
const app = express();

app.use(express.json());

// Los ids deberian ser hashes
let bd = {
  users: [
    { id: 1, name: 'Fabian Souza' },
    { id: 2, name: 'Sebastián Giunta' },
  ],
  currencies: [
    { id: 1, name: 'Argentinian Peso' },
    { id: 2, name: 'Bitcoin' },
  ],
  holdings: [{ userId: 1, currencyId: 1, amount: 100 }],
};

app.post('/buy_currency/:currencyId', (req, res) => {
  const { userId, amount } = req.body;

  if (req.params.currencyId === 1) {
    res.status(403).send({ errorMessage: 'Cannot buy $ARS' });
  }

  let user_holdings = bd.holdings.filter((hold) => hold.userId === +userId);

  let ars_holding = user_holdings.find((hold) => hold.currencyId === 1);
  ars_holding = { ...ars_holding, amount: ars_holding.amount - amount };

  console.log(ars_holding);

  if (ars_holding.amount < 0) {
    res.status(403).send({ errorMessage: 'Not enough funds' });
  }

  let currency_holding = user_holdings.find(
    (hold) => hold.currencyId === req.params.currencyId
  );

  if (!currency_holding) {
    currency_holding = { userId, currencyId: req.params.currencyId, amount };
  } else {
    currency_holding = {
      ...currency_holding,
      amount: currency.holding.amount + amount,
    };
  }

  bd = {
    ...bd,
    holdings: bd.holdings.filter((hold) => {
      console.log(hold);
      if (hold.userId !== +userId) {
        return;
      }

      if (hold.currencyId === 1) {
        return { ...ars_holding };
      }

      if (hold.currencyId === req.params.currencyId) {
        return { ...currency_holding };
      }
    }),
  };

  console.log(bd);

  res.send({
    message: 'Transaction succeeded',
  });
});

app.post('/currencies/:userId', (req, res) => {
  res.send(bd.holdings.filter((hold) => hold.userId === +req.params.userId));
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
