const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
  const data = {
    message: 'Dados da API',
    items: ['item1', 'item2', 'item3']
  };
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
