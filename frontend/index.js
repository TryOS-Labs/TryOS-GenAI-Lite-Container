const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const path = require("path");

app.use(cors());

// server public ui files to all path
app.use(express.static("public/chat"));
app.use(express.static("public/settings"));

app.get("/search", async (req, res) => {
    const { query } = req.query;
    const response = await axios.get(`https://ollama.com/search?q=${query}`);

    // Load HTML into Cheerio
    const $ = cheerio.load(response.data);

    // Select all <li> inside <ul> inside <div id="searchresults">
    const results = [];
    $("#searchresults ul li").each((index, element) => {
        const title = $(element)
            .find("[x-test-search-response-title]")
            .text()
            .trim();
        const description = $(element).find("p.text-md").text().trim();

        // Extract all model sizes inside the div
        const modelSizes = [];
        $(element)
            .find("[x-test-size]")
            .each((i, sizeElem) => {
                modelSizes.push($(sizeElem).text().trim());
            });

        results.push({ title, description, modelSizes });
    });

    // Display results
    console.log("Extracted Data:", results);

    res.json(results);
});

app.get("/getsize", async (req, res) => {
    const { query } = req.query;
    const response = await axios.get(`https://ollama.com/library/${query}`);

    // Load HTML into Cheerio
    const $ = cheerio.load(response.data);

    // Navigate to the correct <p> tag inside the hierarchy
    const pTag = $("#file-explorer div div div p");

    // Split the text by " · " and get the size (last part)
    const textParts = pTag.text().split(" · ");
    const size = textParts.length > 1 ? textParts[1].trim() : null;

    res.json(size);
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "chat", "index.html"));
});
app.get("/settings", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "settings", "index.html"));
});

app.listen(3001, () => {
    console.log(`app is listening on port 3000`);
});
