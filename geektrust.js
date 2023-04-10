const fs = require("fs");
const path = require("path");

// taking file name from second argument in node run
const filename = process.argv[2];
// file path
const inputFilePath = path.join(__dirname, "sample_input", filename);

// travel Charges as per person
const adultChargeCost = 200;
const seniorChargeCost = 100;
const kidChargeCost = 50;

// variables
const adult = "ADULT";
const kid = "KID";
const senior = "SENIOR_CITIZEN";

const central = "CENTRAL";
const airport = "AIRPORT";

const balance = "BALANCE";
const checkIn = "CHECK_IN";

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
  if (result[0] === balance) {
    processBalanceCommand(result, index)
  } else if (result[0] === checkIn) {
    processCheckInCommand(result);
  }
});

//  -------------------* --------------- * ----------------- * ----------------- * ----------------

// central station object
// store output summary of central station
const centralStation = {
  station: central,
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
  station: airport,
  totalCollection: 0,
  discount: 0,
  noOfSenior: 0,
  noOfAdult: 0,
  noOfKid: 0,
};

module.exports = airportStation;

const updateStationData = (stationData, cost, isServiceCharge, requiredAmount, type, i) => {
  let fare = cost;
  if ((i + 1) % 2 === 0) {
    fare = fare - cost / 2;

    if (isServiceCharge) {
      stationData.totalCollection =
        stationData.totalCollection +
        cost / 2 +
        (requiredAmount / 2) * ServiceCharge;
      isServiceCharge = false;
    } else {
      stationData.totalCollection =
        stationData.totalCollection + cost / 2;
    }
    stationData.discount = stationData.discount + cost / 2;
  } else {
    if (isServiceCharge) {
      stationData.totalCollection =
        stationData.totalCollection +
        cost +
        requiredAmount * ServiceCharge;
      isServiceCharge = false;
    } else {
      stationData.totalCollection =
        stationData.totalCollection + cost;
    }
  }

  switch (type) {
    case adult:
      stationData.noOfAdult++;
      break;
    case kid:
      stationData.noOfKid++;
      break;
    case senior:
      stationData.noOfSenior++;
      break;
    default:
      break;
  }
};

const updateCentralStationData = (data, cost, isServiceCharge, requiredAmount, i) => {
  updateStationData(centralStation, cost, isServiceCharge, requiredAmount, data.type, i);
};

const updateAirportStationData = (data, cost, isServiceCharge, requiredAmount, i) => {
  updateStationData(airportStation, cost, isServiceCharge, requiredAmount, data.type, i);
};

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

    if (station === central) {
      updateCentralStationData(data, cost, isServiceCharge, requiredAmount, i);
    } else if (station === airport) {
      updateAirportStationData(data, cost, isServiceCharge, requiredAmount, i);
    }
  });
};



//  -------------------* --------------- * ----------------- * ----------------- * ----------------

metroCard.forEach((data) => {
  switch (data.type) {
    case adult:
      stationSummary(data, adultChargeCost, isServiceCharge);
      break;
    case kid:
      stationSummary(data, kidChargeCost, isServiceCharge);
      break;
    case senior:
      stationSummary(data, seniorChargeCost, isServiceCharge);
      break;
    default:
      break;
  }
});

//  -------------------* --------------- * ----------------- * ----------------- * ----------------

// Print station details summary
printSummary(centralStation);
printSummary(airportStation);

