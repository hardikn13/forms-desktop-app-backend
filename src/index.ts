import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to check server status
app.get("/ping", (req, res) => {
  res.send(true);
});

// Endpoint to submit data
app.post("/submit", (req, res) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;

  if (!name || !email || !phone || !github_link || !stopwatch_time) {
    return res.status(400).send("All fields are required");
  }

  const submission = { name, email, phone, github_link, stopwatch_time };

  fs.readFile(path.join(__dirname, "../db.json"), "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading database");
    }
    let submissions = [];
    try {
      submissions = JSON.parse(data);
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).send("Error parsing database content");
    }
    submissions.push(submission);
    fs.writeFile(
      path.join(__dirname, "../db.json"),
      JSON.stringify(submissions, null, 2),
      (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          return res.status(500).send("Error writing to database");
        }
        res.send("Submission saved!");
      }
    );
  });
});

// Endpoint to read data
app.get("/read", (req, res) => {
  const { index } = req.query;

  if (index === undefined) {
    return res.status(400).send("Index query parameter is required");
  }

  fs.readFile(path.join(__dirname, "../db.json"), "utf-8", (err, data) => {
    if (err) throw err;
    const submissions = JSON.parse(data);
    const idx = parseInt(index as string);

    if (idx < 0 || idx >= submissions.length) {
      return res.status(404).send("Submission not found");
    }

    res.json(submissions[idx]);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
