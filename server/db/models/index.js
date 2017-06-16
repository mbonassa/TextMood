const db = require('../db');

const Message = require('./message');
const Word = require('./word');

Message.belongsToMany(Word, {through: 'MessageWord'});
Word.belongsToMany(Message, {through: 'MessageWord'});

module.exports = {
	db,
    Message,
    Word
};

