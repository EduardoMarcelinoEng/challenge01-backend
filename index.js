const express = require('express');
const app = express();
const { resolve } = require('path');
const { port } = require(resolve('src', 'config'));
const { users } = require(resolve('src', 'controllers'));

app.use(express.json());
app.use('/users', users);

app.listen(port, ()=>console.log(`Aplicação rodando na porta ${port}`));
