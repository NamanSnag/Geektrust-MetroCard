const metroCard = require('./geektrust');

const processBalanceCommand = (result, index) => {
    let card = {
      id: index + 1,
      balance: parseInt(result[2]),
      type: null,
      cardId: result[1],
      checkInCount: 0,
      journey: [],
    };
    metroCard.push(card);
  }

  //   exporting functions
module.exports = {
    processBalanceCommand,
  };
  