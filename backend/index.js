require("dotenv").config();
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const pdfParse = require("pdf-parse");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 4300;

app.use(bodyParser.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const openaiApiKey = process.env.apiKey;


app.post("/api/analyze-pdf", upload.single("pdfFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfContent = req.file.buffer;

    const parsedData = await parsePDF(pdfContent);
    const analyzedData = await analyzeWithOpenAI(parsedData);

    res.json(analyzedData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

async function parsePDF(pdfContent) {
  try {
    const data = await pdfParse(pdfContent);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw error;
  }
}

async function analyzeWithOpenAI(text) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        prompt: text,
        max_tokens: 150,
        model: "gpt-3.5-turbo",
        temperature: 0.7,
      },

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    const analyzedData = response.data.choices[0].text.trim();

    return { AnalyzedData: analyzedData };
  } catch (error) {
    console.error(
      "Error analyzing with OpenAI:",
      error.response?.data || error.message
    );
    throw error;
  }
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
