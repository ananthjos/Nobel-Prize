const express = require("express");
const winner = require("./routes/winners");
const app = express();

app.use("/nobelprize", winner);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started at Port ${PORT} `));
