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

    if (isNaN(idx) || idx < 0 || idx >= submissions.length) {
      return res.status(404).send("Submission not found");
    }

    res.json(submissions[idx]);
  });
});

// Endpoint to get total number of submissions
app.get("/totalSubmissions", (req, res) => {
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
    res.send(submissions.length.toString());
  });
});

// Endpoint to delete a submission
app.delete("/delete", (req, res) => {
  const { index } = req.query;

  console.log(`Received request to delete submission at index: ${index}`);

  if (index === undefined) {
    return res.status(400).send("Index query parameter is required");
  }

  const idx = parseInt(index as string);
  if (isNaN(idx)) {
    console.error(`Invalid index: ${index}`);
    return res.status(400).send("Index must be a number");
  }

  fs.readFile(path.join(__dirname, "../db.json"), "utf-8", (err, data) => {
    if (err) {
      console.error(`Error reading database: ${err.message}`);
      return res.status(500).send("Error reading database");
    }
    let submissions = [];
    try {
      submissions = JSON.parse(data);
    } catch (parseError) {
      return res.status(500).send("Error parsing database content");
    }

    if (idx < 0 || idx >= submissions.length) {
      console.error(`Submission not found at index: ${idx}`);
      return res.status(404).send("Submission not found");
    }

    submissions.splice(idx, 1);

    fs.writeFile(
      path.join(__dirname, "../db.json"),
      JSON.stringify(submissions, null, 2),
      (writeErr) => {
        if (writeErr) {
          console.error(`Error writing to database: ${writeErr.message}`);
          return res.status(500).send("Error writing to database");
        }
        console.log(`Submission deleted successfully at index: ${idx}`);
        res.send("Submission deleted successfully!");
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
