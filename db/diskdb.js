const config = require('config');
const diskdb = require('diskdb');

let db;

function getInstance(callback) {
    if (db) { return callback(db); }
    db = diskdb.connect(config.get('dataserver.db'), ['images']).images;
    return callback(db);
}

module.exports = {
    getInstance: getInstance
};
