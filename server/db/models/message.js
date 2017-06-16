const Sequelize = require('sequelize');
const db = require('../db');
const Word = require('./word.js');
var Promise = require('bluebird');

const Message = db.define('message', {
    text: {
        type: Sequelize.TEXT
    },
    handle: {
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.INTEGER
    }
}, {
    getterMethods: {
        // score () {
        //     const arr = this.text.split(' ');
        //     let promiseArray = [];
        //     let score = 0;
        //     arr.forEach(word => {
        //         let promise = Word.findOne({where: {word}})
        //         .then(instance => Number(instance.getDataValue('score')))
        //         .catch(console.error.bind(console));
        //         promiseArray.push(promise)
        //     })
        //     return Promise.all(promiseArray)
        //         .then(array => {
        //             return (
        //                 array.reduce((sum, element) => {
        //                     return sum + element
        //                 })/(arr.length)  
        //             )
        //         })
        //         .catch(console.error.bind(console))
        // },
        realDate () { 
            const date = new Date(1000*this.date+978307200000)
            return date.toString().slice(0, 16)
        },
        dayOfTheWeek () {
            return this.realDate.slice(0, 4)
        },
        month () {
            return this.realDate.slice(4, 7)
        }, 
        day () {
            return this.realDate.slice(8, 10)
        },
        year () {
            return this.realDate.slice(-5)
        },
        wordArray () {
            return this.text.split(' ')
        }
    }
});


// Message.findOne({}).then(instance => instance.score).then(result => console.log(result)).catch(console.error.bind(console))


module.exports = Message;