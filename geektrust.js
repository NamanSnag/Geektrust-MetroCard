const fs = require("fs");
const process = require("process");
const path = require("path");

const filename = process.argv[2];

const inputFilePath = path.join(__dirname, "sample_input", filename);

// service Charge
const adultCost = 200;
const seniorCost = 100;
const kidCost = 50;

// converted 2% into number by 100/2
// so whenever we want to get the 2% of cost, By multiplying we get that
const ServiceCharge = 0.02;

const metroCard = [];
module.exports = metroCard;

const { printSummary } = require("./summary");

const { processBalanceCommand } = require("./helperFn");

let isServiceCharge = false;

const data = fs.readFileSync(inputFilePath, "utf8");
let inputLines = data.toString().split("\n");

// Add your code here to process input commands

// Fill input entries in the array
inputLines.forEach((data, index) => {
  const result = data.toString().split(" ");
  if (result[0] === "BALANCE") {
    processBalanceCommand(result, index)
  } else if (result[0] === "CHECK_IN") {
    metroCard.forEach((data) => {
      if (data.cardId === result[1]) {
        data.type = result[2];
        data.checkInCount++;
        data.journey.push(result[3]);
      }
    });
  }
});

// central station object
// store output summary of central station
const centralStation = {
  station: "CENTRAL",
  totalCollection: 0,
  discount: 0,
  noOfSenior: 0,
  noOfAdult: 0,
  noOfKid: 0,
};

// airport station object
// store output summary of airport station
const airportStation = {
  station: "AIRPORT",
  totalCollection: 0,
  discount: 0,
  noOfSenior: 0,
  noOfAdult: 0,
  noOfKid: 0,
};

//  ------------------- We have to add the properties of station objects here -----------------

metroCard.forEach((data, index) => {
  if (data.type === "ADULT") {
    let fare = data.checkInCount * adultCost; // fare = 2 * 200
    let discountTime = Math.floor(data.checkInCount / 2);
    fare = fare - (discountTime * adultCost) / 2;
    let requiredAmound;

    // checking metro card balance
    if (fare > data.balance) {
      requiredAmound = fare - data.balance;
      data.balance = data.balance + requiredAmound;
      isServiceCharge = true;
    }

    data.balance = data.balance - fare;

    data.journey.map((station, i) => {
      if (station === "CENTRAL") {
        if ((i + 1) % 2 === 0) {
          if (isServiceCharge) {
            centralStation.totalCollection =
              centralStation.totalCollection +
              adultCost / 2 +
              requiredAmound * ServiceCharge;
            isServiceCharge = false;
          } else {
            centralStation.totalCollection =
              centralStation.totalCollection + adultCost / 2;
          }
          centralStation.discount = centralStation.discount + adultCost / 2;
        } else {
          if (isServiceCharge) {
            centralStation.totalCollection =
              centralStation.totalCollection +
              adultCost +
              requiredAmound * ServiceCharge;
            isServiceCharge = false;
          } else {
            centralStation.totalCollection =
              centralStation.totalCollection + adultCost;
          }
        }
        centralStation.noOfAdult++;
      } else {
        if ((i + 1) % 2 === 0) {
          if (isServiceCharge) {
            airportStation.totalCollection =
              airportStation.totalCollection +
              adultCost / 2 +
              requiredAmound * ServiceCharge;
            isServiceCharge = false;
          } else {
            airportStation.totalCollection =
              airportStation.totalCollection + adultCost / 2;
          }

          airportStation.discount = airportStation.discount + adultCost / 2;
        } else {
          if (isServiceCharge) {
            airportStation.totalCollection =
              airportStation.totalCollection +
              adultCost +
              requiredAmound * ServiceCharge;
            isServiceCharge = false;
          } else {
            airportStation.totalCollection =
              airportStation.totalCollection + adultCost;
          }
        }
        airportStation.noOfAdult++;
      }
    });
  } else if (data.type === "KID") {
    let fare = data.checkInCount * kidCost;
    let requiredAmount;
    if (fare > data.balance) {
      requiredAmount = fare - data.balance;
      data.balance = data.balance + requiredAmount;
      isServiceCharge = true;
    }
    data.balance = data.balance - fare;
    data.journey.map((station) => {
      if (station === "CENTRAL") {
        centralStation.totalCollection =
          centralStation.totalCollection + kidCost;
        centralStation.noOfKid++;
      } else {
        airportStation.totalCollection =
          airportStation.totalCollection + kidCost;
        airportStation.noOfKid++;
      }
    });
  } else if (data.type === "SENIOR_CITIZEN") {
    let fare = data.checkInCount * seniorCost; // fare = 1 * 100
    let discountTime = Math.floor(data.checkInCount / 4);
    fare = fare - (discountTime * seniorCost) / 2;
    let requiredAmound;

    // checking metro card balance
    if (fare > data.balance) {
      requiredAmound = fare - data.balance;
      data.balance = data.balance + requiredAmound;
      isServiceCharge = true;
    }

    data.balance = data.balance - fare;

    data.journey.map((station, i) => {
      if (station === "CENTRAL") {
        if ((i + 1) % 2 === 0) {
          if (isServiceCharge) {
            centralStation.totalCollection =
              centralStation.totalCollection +
              seniorCost / 2 +
              requiredAmound * ServiceCharge;
            isServiceCharge = false;
          } else {
            centralStation.totalCollection =
              centralStation.totalCollection + seniorCost / 2;
          }
          centralStation.discount = centralStation.discount + seniorCost / 2;
        } else {
          if (isServiceCharge) {
            centralStation.totalCollection =
              centralStation.totalCollection +
              seniorCost +
              requiredAmound * ServiceCharge;
            isServiceCharge = false;
          } else {
            centralStation.totalCollection =
              centralStation.totalCollection + seniorCost;
          }
        }
        centralStation.noOfSenior++;
      } else {
        if ((i + 1) % 2 === 0) {
          if (isServiceCharge) {
            airportStation.totalCollection =
              airportStation.totalCollection +
              seniorCost / 2 +
              requiredAmound * ServiceCharge;
            isServiceCharge = false;
          } else {
            airportStation.totalCollection =
              airportStation.totalCollection + seniorCost / 2;
          }
          airportStation.discount = airportStation.discount + seniorCost / 2;
        } else {
          if (isServiceCharge) {
            airportStation.totalCollection =
              airportStation.totalCollection +
              seniorCost +
              requiredAmound * ServiceCharge;
            isServiceCharge = false;
          } else {
            airportStation.totalCollection =
              airportStation.totalCollection + seniorCost;
          }
        }
        airportStation.noOfSenior++;
      }
    });
  }

  // console.log(data.balance);
});

// Print station details summary
printSummary(centralStation);
printSummary(airportStation);

