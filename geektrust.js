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

let isServiceCharge = false;

const data = fs.readFileSync(inputFilePath, "utf8");
let inputLines = data.toString().split("\n");

// Add your code here to process input commands

// Fill input entries in the array
inputLines.forEach((data, index) => {
  const result = data.toString().split(" ");
  if (result[0] === "BALANCE") {
    let card = {
      id: index + 1,
      balance: parseInt(result[2]),
      type: null,
      cardId: result[1],
      checkInCount: 0,
      journey: [],
    };
    metroCard.push(card);
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
    fare = fare - ((discountTime * adultCost)/2);
    console.log("fareeee",fare,"index",index)
    let requiredAmound ;

    // checking metro card balance
    if (fare > data.balance) {
      requiredAmound = (fare - data.balance);
      data.balance = data.balance + requiredAmound;
      isServiceCharge = true;
    }

    data.balance = data.balance - fare;

    data.journey.map((station, i) => {
        if (station === "CENTRAL") {
          if((i+1)%2 === 0) {
            if(isServiceCharge) {
              centralStation.totalCollection = centralStation.totalCollection + (adultCost/2) + (requiredAmound*ServiceCharge);
              isServiceCharge = false;
            }else {
              centralStation.totalCollection = centralStation.totalCollection + (adultCost/2);
            }
            centralStation.discount = centralStation.discount + (adultCost / 2);
          }else {
            if(isServiceCharge) {
              centralStation.totalCollection = centralStation.totalCollection + adultCost + (requiredAmound*ServiceCharge);
              isServiceCharge = false;
            }else {
              centralStation.totalCollection = centralStation.totalCollection + adultCost;
            }
          }
          centralStation.noOfAdult++;
        } else {
          if((i+1)%2 === 0) {

            if(isServiceCharge) {
              airportStation.totalCollection = airportStation.totalCollection + (adultCost/2)+ (requiredAmound*ServiceCharge);
              isServiceCharge = false;
            }else {
              airportStation.totalCollection = airportStation.totalCollection + (adultCost/2);
            }
            
            airportStation.discount = airportStation.discount + (adultCost / 2);
          }else {
            if(isServiceCharge) {
              airportStation.totalCollection = airportStation.totalCollection + adultCost+ (requiredAmound*ServiceCharge);
              isServiceCharge = false;
            }else {
              airportStation.totalCollection = airportStation.totalCollection + adultCost;
            }
          }
          airportStation.noOfAdult++;
        }
    });
  } else if (data.type === "KID") {
    // fare = fare * kidCost + kidCost * data.checkInCount;

    // if (fare > data.balance) {
    //   data.balance = data.balance + 500;
    // }
    // let discountTime = Math.floor(data.checkInCount / 2);

    // data.balance = data.balance - fare + (kidCost * discountTime) / 2;
    // data.journey.map((station, i) => {
    //   if (station === "CENTRAL") {
    //     centralStation.totalCollection = fare;
    //     centralStation.noOfKid++;
    //     if ((i + 1) % 2 === 0) {
    //       centralStation.discount = kidCost / 2;
    //     }
    //   } else {
    //     airportStation.totalCollection = fare;
    //     airportStation.noOfKid++;
    //     if ((i + 1) % 2 === 0) {
    //       airportStation.discount = kidCost / 2;
    //     }
    //   }
    // });
  } else if (data.type === "SENIOR_CITIZEN") {

  }

  // console.log(data.balance);
});

// printing function for station summary
const printSummary = (data) => {
  const { station, totalCollection, discount, noOfSenior, noOfAdult, noOfKid } =
    data;
  console.log(
    "TOTAL_COLLECTION" +
      "  " +
      station +
      "  " +
      totalCollection +
      "  " +
      discount
  );
  console.log("PASSENGER_TYPE_SUMMARY");
  if (noOfAdult > 0) console.log("ADULT " + noOfAdult);
  if (noOfKid > 0) console.log("KID " + noOfKid);
  if (noOfSenior > 0) console.log("SENIOR_CITIZEN " + noOfSenior);
};

// Print station details summary
// printSummary(centralStation);
// printSummary(airportStation);

console.log(centralStation);
console.log(airportStation);
