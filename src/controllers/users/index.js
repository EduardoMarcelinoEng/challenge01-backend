const express = require('express');
const router = express.Router();
const { resolve } = require('path');
const { Users } = require(resolve('src', 'models'));
const { valid } = require(resolve('src', 'utils'));
const bcrypt = require('bcrypt');

router.get('/:email', async (req, res)=>{
    try {

        const { email } = req.params;

        const user = await Users.findAll({
            where: {
                email
            }
        });

        if(user){
            user.password = undefined;
            user._id = undefined;
            return res.status(200).json(user);
        }

        return res.status(404).json('Usuário não encontrado!');
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.post('/', async (req, res)=>{
    try {
        const { email, password, name, username } = req.body;

        if(!email) return res.status(400).json('E-mail não informado!');
        if(!password) return res.status(400).json('Senha não informada!');
        if(!name) return res.status(400).json('Nome não informado');
        if(!username) return res.status(400).json('Nome de usuário não informado!');

        if(!valid.email(email)) return res.status(400).json('Digite um e-mail válido');
        if(!valid.password(password)) return res.status(400).json('Senha deve ter pelo menos 6 caracteres');

        const hasEmail = await Users.findAll({
            where: {
                email
            }
        });

        if(hasEmail) return res.status(400).json('E-mail informado já cadastrado!');

        const hasUsername = await Users.findAll({
            where: {
                username
            }
        });

        if(hasUsername) return res.status(400).json('Nome de usuário informado já cadastrado!');

        const passwordCrypt = await new Promise((resolve, reject) => {

            bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(password, salt, function(err, hash) {
                
                resolve(hash);
      
              });
            });
    
        });

        const user = await Users.create({
            email,
            password: passwordCrypt,
            name,
            username
        });

        user.password = undefined;

        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.delete('/:email', async (req, res)=>{
    try {

        const { email } = req.params;

        Users.destroy({
            where: {
                email
            }
        })
            .then(()=>res.status(200).json(`Usuário com e-mail ${email} deletado!`))
            .catch(error=>res.status(400).json(error));

    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.put('/:email', async (req, res)=>{
    try {

        const { email } = req.params;
        const { newEmail, password, username, name } = req.body;

        const obj = {};

        if(name) obj.name = name;

        if(newEmail) {
            if(!valid.email(newEmail)) return res.status(400).json('Novo e-mail inválido');
            const hasEmail = await Users.findAll({
                where: {
                    email: newEmail
                }
            });
    
            if(hasEmail) return res.status(400).json('Novo e-mail já cadastrado');

            obj.email = newEmail;
        }

        if(username) {
            const hasUsername = await Users.findAll({
                where: {
                    username
                }
            });
    
            if(hasUsername) return res.status(400).json('Nome de usuário informado já cadastrado!');

            obj.username = username;
        }

        if(password && valid.password(password)) {
            const passwordCrypt = await new Promise((resolve, reject) => {

                bcrypt.genSalt(10, function(err, salt) {
                  bcrypt.hash(password, salt, function(err, hash) {
                    
                    resolve(hash);
          
                  });
                });
        
            });
            obj.password = passwordCrypt;
        }

        Users.update({
            data: obj,
            where: {
                email
            }
        })
            .then(async ()=>{
                const userUpdated = await Users.findAll({
                    where: {
                        email: newEmail ? newEmail : email
                    }
                });

                userUpdated.password = undefined;

                res.status(200).json(userUpdated)
            })
            .catch(error=>res.status(400).json(error));

    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = router;