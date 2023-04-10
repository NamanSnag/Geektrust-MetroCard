const metroCard = require("./geektrust");

// Function to process the 'balance' command
const processBalanceCommand = (result, index) => {
  // Creating a new 'card' object with the provided properties
  let card = {
    id: index + 1,
    balance: parseInt(result[2]),
    type: null,
    cardId: result[1],
    checkInCount: 0,
    journey: [],
  };
  metroCard.push(card);
};

// Function to process the 'check-in' command
const processCheckInCommand = (result) => {
  metroCard.forEach((data) => {
    if (data.cardId === result[1]) {
      data.type = result[2];
      data.checkInCount++;
      data.journey.push(result[3]);
    }
  });
};

//   exporting functions
module.exports = {
  processBalanceCommand,
  processCheckInCommand,
};
