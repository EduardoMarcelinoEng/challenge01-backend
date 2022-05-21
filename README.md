# Instruções para uso

# Rota para criação de usuário
Fazer uma requisição http para a rota /users com o método post, passando no corpo da requisição um json com o email, password, username e name. Todos esses campos são obrigatórios
Ex. usando curl: 
curl -X POST \
  http://localhost:3000/users \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"email": "eduardo@gmail.com",
	"password": "12345!",
	"name": "Eduardo",
	"username": "edu12345"
}'

# Rota para deletar usuário
Fazer uma requisição http para a rota /users/:email com o método delete, passando como parâmetro o email do usuário que pretende deletar
Ex. usando curl: 
curl -X DELETE \
  http://localhost:3000/users/eduardo@gmail.com \
  -H 'cache-control: no-cache' \

# Rota para buscar um perfil de usuário
Fazer uma requisição http para a rota /users/:email com o método get, passando como parâmetro o email do usuário que pretende buscar o perfil dele
Ex. usando curl:
curl -X GET \
  http://localhost:3000/users/eduardo@gmail.com \
  -H 'cache-control: no-cache' \

# Rota para editar um usuário
Fazer uma requisição http para a rota /users/:email com o método put, passando no corpo da requisição um json com os valores que deseja alterar no cadastro do usuário
Ex. usando curl:
curl -X PUT \
  http://localhost:3000/users/eduardo@gmail.com \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 7e146c4e-8a28-81b7-f291-0dac62d487c9' \
  -d '{
	"password": "123456",
	"name": "Eduardo Marcelino"
}'