const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const proxy = (req, res, target) => {
  req.pipe(request(target + req.url)).pipe(res);
};

app.use('/mf_drawer', (req, res) => {
  proxy(req, res, 'http://mf_drawer:8001');
});

app.use('/mf_videos', (req, res) => {
  proxy(req, res, 'http://mf_videos:8002');
});

app.get('/', (req, res) => {
  res.send('<div>Servidor BFF</div>');
});

app.listen(PORT, () => {
  console.log(`Servidor BFF rodando na porta ${PORT}`);
});