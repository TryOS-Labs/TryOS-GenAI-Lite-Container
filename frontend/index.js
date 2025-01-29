const express = require("express");
const cors = require("cors");

const app = express();
const path = require("path");

app.use(cors());

// server public ui files to all path
app.use(express.static("public"));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(3000, () => {
    console.log(`app is listening on port 3000`);
});
