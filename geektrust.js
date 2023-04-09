const fs = require("fs");
const path = require("path");

// taking file name from second argument in node run
const filename = process.argv[2];

const inputFilePath = path.join(__dirname, "sample_input", filename);

// travel Charges as per person
const adultChargeCost = 200;
const seniorChargeCost = 100;
const kidChargeCost = 50;

// converted 2% into number by 100/2
// so whenever we want to get the 2% of cost, By multiplying we get that
const ServiceCharge = 0.02;
module.exports = ServiceCharge;

const metroCard = [];

// exporting metrocard, so can use in different files
module.exports = metroCard;

// importing helper functions
const { printSummary } = require("./summary");
const { processBalanceCommand, processCheckInCommand } = require("./helperFn");

let isServiceCharge = false;

// input file data
const data = fs.readFileSync(inputFilePath, "utf8");
// converting file input into array
let inputLines = data.toString().split("\n");

// Add your code here to process input commands

// Fill input entries in the array
inputLines.forEach((data, index) => {
  const result = data.toString().split(" ");
  if (result[0] === "BALANCE") {
    processBalanceCommand(result, index)
  } else if (result[0] === "CHECK_IN") {
    processCheckInCommand(result);
  }
});

//  -------------------* --------------- * ----------------- * ----------------- * ----------------

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
module.exports = centralStation;

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

module.exports = airportStation;

const stationSummary = (data, cost, isServiceCharge) => {
  let requiredAmount = 0;

  data.journey.map((station, i) => {
    let fare = cost;

    if (fare > data.balance) {
      requiredAmount = fare - data.balance;
      data.balance = data.balance + requiredAmount;
      isServiceCharge = true;
    }

    data.balance = data.balance - fare;

    if (station === "CENTRAL") {
      if ((i + 1) % 2 === 0) {
        fare = fare - cost / 2;

        if (isServiceCharge) {
          centralStation.totalCollection =
            centralStation.totalCollection +
            cost / 2 +
            (requiredAmount/2) * ServiceCharge;
          isServiceCharge = false;
        } else {
          centralStation.totalCollection =
            centralStation.totalCollection + cost / 2;
        }
        centralStation.discount = centralStation.discount + cost / 2;
      } else {
        if (isServiceCharge) {
          centralStation.totalCollection =
            centralStation.totalCollection +
            cost +
            requiredAmount * ServiceCharge;
          isServiceCharge = false;
        } else {
          centralStation.totalCollection =
            centralStation.totalCollection + cost;
        }
      }

      if (data.type === "ADULT") {
        centralStation.noOfAdult++;
      } else if (data.type === "KID") {
        centralStation.noOfKid++;
      } else if (data.type === "SENIOR") {
        centralStation.noOfSenior++;
      }
    } else if (station === "AIRPORT") {
      if ((i + 1) % 2 === 0) {
        fare = fare - cost / 2;

        if (isServiceCharge) {
          airportStation.totalCollection =
            airportStation.totalCollection +
            cost / 2 +
            (requiredAmount/2) * ServiceCharge;
          isServiceCharge = false;
        } else {
          airportStation.totalCollection =
            airportStation.totalCollection + cost / 2;

        }
        airportStation.discount = airportStation.discount + cost / 2;
      } else {
        if (isServiceCharge) {
          airportStation.totalCollection =
            airportStation.totalCollection +
            cost +
            requiredAmount * ServiceCharge;
          isServiceCharge = false;
        } else {
          airportStation.totalCollection =
            airportStation.totalCollection + cost;
        }
      }

      if (data.type === "ADULT") {
        airportStation.noOfAdult++;
      } else if (data.type === "KID") {
        airportStation.noOfKid++;
      } else if (data.type === "SENIOR") {
        airportStation.noOfSenior++;
      }
    } else {
      // handle invalid station
    }
  });
};


//  -------------------* --------------- * ----------------- * ----------------- * ----------------

metroCard.forEach((data, index) => {
  if (data.type === "ADULT") {
    stationSummary(data, adultChargeCost, isServiceCharge);
  } else if (data.type === "KID") {
    stationSummary(data, kidChargeCost, isServiceCharge);
  } else if (data.type === "SENIOR_CITIZEN") {
    stationSummary(data, seniorChargeCost, isServiceCharge);
  }

  // console.log(data.balance);
});

//  -------------------* --------------- * ----------------- * ----------------- * ----------------

// Print station details summary
printSummary(centralStation);
printSummary(airportStation);

