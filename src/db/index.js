const Datastore = require('nedb');
const db = {};
db.Users = new Datastore();

module.exports = db;