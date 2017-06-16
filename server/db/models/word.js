const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('word', {
    word: {
        type: Sequelize.STRING
    },
    rank: {
        type: Sequelize.INTEGER
    },
    score: {
        type: Sequelize.DECIMAL
    }
});