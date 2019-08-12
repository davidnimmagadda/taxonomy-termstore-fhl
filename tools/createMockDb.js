/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mockData = require("./mockData");

const { ts, termStores, termGroups, termSets, terms } = mockData;
const data = JSON.stringify({ ts, termStores, termGroups, termSets, terms });
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function(err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
