const { resolve } = require('path');
const { Users } = require(resolve('src', 'db'));

module.exports = {
    create: (obj)=>{
        return new Promise((resolve, reject)=>{
            Users.insert(obj, function (err, user) {
                resolve(user);
                reject(err);
            });
        });
    },
    findAll: (obj)=>{
        return new Promise((resolve, reject)=>{
            Users.find(obj.where, function (err, users) {
                resolve(users[0]);
                reject(err);
            });
        });
    },
    destroy: (obj)=>{
        return new Promise((resolve, reject)=>{
            Users.remove(obj.where, {}, function (err, numRemoved) {
                if(!Number(numRemoved)) reject('Erro ao deletar usuário: usuário não encontrado!');
                if(err) reject(err);
                resolve(numRemoved);
            });
        });
    },
    update: (obj)=>{
        return new Promise((resolve, reject)=>{
            Users.update(obj.where, { $set: obj.data }, function (err, numReplaced) {
                if(!Number(numReplaced)) reject('Erro ao editar usuário: usuário não encontrado!');
                if(err) reject(err);
                resolve(numReplaced);
            });

        });
    }
}