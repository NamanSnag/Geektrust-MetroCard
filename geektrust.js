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
// so whenever we want to get the 2% of cost, By multiplying we get tbat
const ServiceCharge = 0.02;

const metroCard = [];

fs.readFile(inputFilePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  var inputLines = data.toString().split("\n");

  // Add your code here to process input commands

  //   Fill input entries in the array
  inputLines.forEach((data, index) => {
    const result = data.toString().split(" ");
    if (result[0] === "BALANCE") {
      let card = {
        id: index + 1,
        balance: result[2],
        type: "dfsdfs",
        cardId: result[1],
        CheckInCount: 0,
      };
      metroCard.push(card);
    } else if (result[0] === "CHECK_IN") {
      metroCard.map((data) => {
        if (data.cardId === result[1]) {
          data.type = result[2];
        }
      });
    }
  });
  console.log(metroCard)
});
