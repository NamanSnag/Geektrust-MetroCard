const fs = require("fs");
const path = require("path");

// taking file name from second argument in node run
const filename = process.argv[2];
// file path
const inputFilePath = path.join(__dirname, "sample_input", filename);

// travel Charges for pessengers
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

// converted 2% into number by 2/100 => 0.02
// so whenever we want to get the 2% of cost, By multiplying we get that
const ServiceCharge = 0.02;
module.exports = ServiceCharge;

// storing input data
const metroCard = [];

// exporting metrocard, so can use in different files
module.exports = metroCard;

// importing helper functions
const { printSummary } = require("./summary");
const {
  processBalanceCommand,
  processCheckInCommand,
} = require("./inputHandler");

// input file data
const data = fs.readFileSync(inputFilePath, "utf8");
// converting file input into array
let inputLines = data.toString().split("\n");

// Add your code here to process input commands

// Fill input entries in the array
inputLines.forEach((data, index) => {
  const result = data.toString().split(" ");
  if (result[0] === balance) {
    processBalanceCommand(result, index);
  } else if (result[0] === checkIn) {
    processCheckInCommand(result);
  }
});

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

// update stations
const updateStationData = (args) => {
  let { station, cost, isServiceCharge, requiredAmount, data, i } = args;
  let fare = cost;
  // for discount purposes
  if ((i + 1) % 2 === 0) {
    cost = cost / 2;
    requiredAmount = requiredAmount / 2;
    station.discount = station.discount + cost;
  }

  if (isServiceCharge) {
    station.totalCollection =
      station.totalCollection + cost + requiredAmount * ServiceCharge;
    isServiceCharge = false;
  } else station.totalCollection = station.totalCollection + cost;

  if (data === adult) station.noOfAdult++;
  else if (data === kid) station.noOfKid++;
  else if (data === senior) station.noOfSenior++;
};

// adding station summary to respected stations
const stationSummary = (data, cost) => {
  let requiredAmount = 0;
  let isServiceCharge = false;

  data.journey.map((station, i) => {
    let fare = cost;
    if (fare > data.balance) {
      requiredAmount = fare - data.balance;
      data.balance = data.balance + requiredAmount;
      isServiceCharge = true;
    }
    data.balance = data.balance - fare;
    if (station === central)
      updateStationData({
        station: centralStation,
        cost,
        isServiceCharge,
        requiredAmount,
        data: data.type,
        i,
      });
    else if (station === airport)
      updateStationData({
        station: airportStation,
        cost,
        isServiceCharge,
        requiredAmount,
        data: data.type,
        i,
      });
  });
};

// filling station data by looping through metroCard array
metroCard.forEach((data) => {
  switch (data.type) {
    case adult:
      stationSummary(data, adultChargeCost);
      break;
    case kid:
      stationSummary(data, kidChargeCost);
      break;
    case senior:
      stationSummary(data, seniorChargeCost);
      break;
    default:
      break;
  }
});

// Print station details summary
printSummary(centralStation);
printSummary(airportStation);
