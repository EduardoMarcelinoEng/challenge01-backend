# Instruções para uso

# Rota para criação de usuário
Fazer uma requisição http para a rota /users com o método post, passando no corpo da requisição um json com o email, password, username e name. Todos esses campos são obrigatórios

# Rota para deletar usuário
Fazer uma requisição http para a rota /users/:email com o método delete, passando como parâmetro o email do usuário que pretende deletar

# Rota para buscar um perfil de usuário
Fazer uma requisição http para a rota /users/:email com o método get, passando como parâmetro o email do usuário que pretende buscar o perfil dele

# Rota para editar um usuário
Fazer uma requisição http para a rota /users/:email com o método put, passando quais valores deseja alterar no cadastro do usuário