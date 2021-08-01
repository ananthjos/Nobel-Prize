const express = require("express");
const router = express.Router();
const fs = require("fs");
const data = fs.readFileSync("prize.json", "utf-8");
const prize = JSON.parse(data);
const { prizes } = prize;

// creating new Array of nobel-prize winners
let newPrizes = [];
prizes.forEach((obj) => {
  obj.laureates.forEach((laureate) => {
    laureate.year = obj.year;
    laureate.category = obj.category;
    laureate.overallMotivation = obj.overallMotivation;
    newPrizes.push(laureate);
  });
});

// search nobel-prize winner by name

router.get("/winnerbyname/:name", (req, res) => {
  try {
    let result = [];
    const { name } = req.params;
    newPrizes.forEach((item) => {
      if (
        item.firstname.toLowerCase() == name.toLowerCase() ||
        item.surname.toLowerCase() == name.toLowerCase()
      ) {
        result.push(item);
      }
    });
    res.json({ result });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// nobel prize winner by year
router.get("/winnerbyyear/:year", (req, res) => {
  try {
    let result = [];
    const { year } = req.params;
    newPrizes.forEach((item) => {
      if (item.year == year) {
        result.push(item);
      }
    });
    res.json({ result });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// nobel prize winner by year and category
router.get("/winnerbyyear&category", (req, res) => {
  try {
    let result = [];
    const { year, category } = req.query;
    newPrizes.forEach((item) => {
      if (
        item.year == year &&
        item.category.toLowerCase() == category.toLowerCase()
      ) {
        result.push(item);
      }
    });
    res.json({ result });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// nobel prize winners in alphabetical order(fistname)
router.get("/allwinners", (req, res) => {
  try {
    const sortedWinners = newPrizes.sort(function (a, b) {
      if (a.firstname < b.firstname) {
        return -1;
      }
      if (a.firstname > b.firstname) {
        return 1;
      }
      return 0;
    });

    res.json({ result: sortedWinners });
  } catch (error) {
    console.log({ error: error.message });
  }
});

module.exports = router;
