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

  console.log("");
};



//   exporting functions
module.exports = {
  printSummary,
};
