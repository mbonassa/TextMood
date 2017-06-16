const router = require('express').Router();
const Message = require('../db/models/message.js');
const Word = require('../db/models/word.js');
const MessageWord = require('../db/models/index.js').db.model('MessageWord');

//Get message scores array from date 1 to date 2
router.put('/range', (req, res, next) => {
  let date1 = +Math.round((new Date (req.body.data.date1.toString()).getTime()/1000)) - 978307200;
  let date2 = +Math.round((new Date (req.body.data.date2.toString()).getTime()/1000)) - 978307200;
  Message.findAll({where: {
    date: {
      $between: [date1, date2]
    }
  }})
  .then(messageArray => {
    const promiseArray = [];
    messageArray.forEach(message => {
      const innerPromiseArray = [];
      const promise = MessageWord.findAll({where: {messageId: message.id}})
                        .then(messageWordArray => {
                          messageWordArray.forEach(messageWord => {
                            const innerPromise = Word.findById(messageWord.wordId)
                                                  .then(wordInstance => wordInstance.score)
                            innerPromiseArray.push(innerPromise);
                          })
                          return Promise.all(innerPromiseArray)
                        })
      promiseArray.push(promise);
    })
    return Promise.all(promiseArray)
  })
  .then(arrayOfArrays => {
    const scoresArray = [];
    arrayOfArrays.forEach(array => {
      const average = array.length ? (array.reduce((sum, current) => sum + current))/(array.length) : null;
      average ? scoresArray.push(average) : null
    })
    return scoresArray
  })
  .then(scoresArray => res.json(scoresArray))
  .catch(console.error.bind(console));
});


//Get all messages from a certain dater
router.put('/date/:date', (req, res, next) => {
  let date = +Math.round((new Date (req.body.data.date1.toString()).getTime()/1000)) - 978307200;

});





///ROUTES BELOW MIGHT NOT BE USEFUL

//Get message score by day of the week
router.get('/dayOfTheWeek/:dayOfTheWeek', (req, res, next) => {
  Message.findAll({where: {
    dayOfTheWeek: req.params.dayOfWeek
  }})
  .then(array => {
    const promiseArray = []
    array.forEach(instance => {
      promiseArray.push(instance.score)
    })
    return Promise.all(promiseArray)
  })
  // .then(array => {
  //   return (
  //   array.reduce((sum, current) => {
  //     return sum + current
  //   })/(array.length)
  //   )
  // })
  .catch(next);
});

//Get message score by day of the month
router.get('/day/:day', (req, res, next) => {
  Message.findAll({where: {
    day: req.params.day
  }})
  .then(array => {
    const promiseArray = []
    array.forEach(instance => {
      promiseArray.push(instance.score)
    })
    return Promise.all(promiseArray)
  })
  // .then(array => {
  //   return (
  //   array.reduce((sum, current) => {
  //     return sum + current
  //   })/(array.length)
  //   )
  // })
  .catch(next);
});

//Get message score by month
router.get('/month/:month', (req, res, next) => {
  Message.findAll({where: {
    month: req.params.month
  }})
  .then(array => {
    const promiseArray = []
    array.forEach(instance => {
      promiseArray.push(instance.score)
    })
    return Promise.all(promiseArray)
  })
  // .then(array => {
  //   return (
  //   array.reduce((sum, current) => {
  //     return sum + current
  //   })/(array.length)
  //   )
  // })
  .catch(next);
});

//Get message score by year
router.get('/year/:year', (req, res, next) => {
  Message.findAll({where: {
    year: req.params.year
  }})
  .then(array => {
    const promiseArray = []
    array.forEach(instance => {
      promiseArray.push(instance.score)
    })
    return Promise.all(promiseArray)
  })
  // .then(array => {
  //   return (
  //   array.reduce((sum, current) => {
  //     return sum + current
  //   })/(array.length)
  //   )
  // })
  .catch(next);
});

//Get message score by handle
router.get('/handle/:handle', (req, res, next) => {
  Message.findAll({where: {
    handle: req.params.handle
  }})
  .then(array => {
    const promiseArray = []
    array.forEach(instance => {
      promiseArray.push(instance.score)
    })
    return Promise.all(promiseArray)
  })
  // .then(array => {
  //   return (
  //   array.reduce((sum, current) => {
  //     return sum + current
  //   })/(array.length)
  //   )
  // })
  .catch(next);
});

//Get message score by word(s)
router.get('/word/:word', (req, res, next) => {

});

router.use((req, res) => {
  res.status(404).send('Not found');
});

module.exports = router;