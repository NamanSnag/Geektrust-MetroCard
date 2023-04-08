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

console.log(metroCard);
