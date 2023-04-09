const metroCard = require("./geektrust");
const airportStation = require("./geektrust");
const centralStation = require("./geektrust");
const ServiceCharge = require("./geektrust");

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
};

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
