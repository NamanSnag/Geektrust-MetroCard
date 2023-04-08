const fs = require("fs");
const process = require("process");
const path = require("path");

const filename = process.argv[2];
const inputFilePath = path.join(__dirname, "sample_input", filename);

// service Charge
const adultCost = 100;
const seniorCost = 50;
const kidCost = 50;

// converted 2% into number by 100/2
// so whenever we want to get the 2% of cost, By multiplying we get that
const ServiceCharge = 0.02;

const metroCard = [];

const data = fs.readFileSync(inputFilePath, "utf8");
let inputLines = data.toString().split("\n");

// Add your code here to process input commands

// Fill input entries in the array
inputLines.forEach((data, index) => {
  const result = data.toString().split(" ");
  if (result[0] === "BALANCE") {
    let card = {
      id: index + 1,
      balance: result[2],
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

// console.log(metroCard);

// central station object
// stoe output summary of central station
const centralStation = {
  station: 'CENTRAL',
  totalCollection : 0,
  discount : 0,
  noOfSenior : 0,
  noOfAdult : 0,
  noOfKid : 0,
}

// airport station object
// stoe output summary of airport station
const airportStation = {
  Station: 'AIRPORT',
  totalCollection : 0,
  discount : 0,
  noOfSenior : 0,
  noOfAdult : 0,
  noOfKid : 0,
}

//  ------------------- We have to add the properties of station objects here -----------------


// printing function for station summary
const printSummary = (data) => {
  const {Station, totalCollection, discount, noOfSenior, noOfAdult, noOfKid} = data;
  console.log("TOTAL_COLLECTION"+"  "+Station+"  "+totalCollection+"  "+discount);
  console.log("PASSENGER_TYPE_SUMMARY")
  if(noOfAdult > 0) console.log("ADULT "+ noOfAdult)
  if(noOfKid > 0) console.log("KID "+ noOfKid)
  if(noOfSenior > 0) console.log("SENIOR_CITIZEN "+ noOfSenior)
}

// Print station details summary
printSummary(centralStation);
printSummary(airportStation);
