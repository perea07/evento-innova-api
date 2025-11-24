import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ---- LOAD JSON FILES ----
const dataPath = (file) => path.join(__dirname, "data", file);

const readJSON = (file) =>
  JSON.parse(fs.readFileSync(dataPath(file), "utf8"));

const writeJSON = (file, data) =>
  fs.writeFileSync(dataPath(file), JSON.stringify(data, null, 2));

// ---- GET ENDPOINTS ----
app.get("/", (req, res) => res.json(readJSON("speakers.json")));
app.get("/speakers", (req, res) => res.json(readJSON("speakers.json")));
app.get("/agenda", (req, res) => res.json(readJSON("agenda.json")));
app.get("/sponsors", (req, res) => res.json(readJSON("sponsors.json")));

// ---- POST ENDPOINTS ----
// Añadir un speaker
app.post("/speakers", (req, res) => {
  const speakers = readJSON("speakers.json");
  speakers.push(req.body);
  writeJSON("speakers.json", speakers);
  res.json({ message: "Speaker agregado", data: req.body });
});

// Añadir un item a la agenda
app.post("/agenda", (req, res) => {
  const agenda = readJSON("agenda.json");
  agenda.push(req.body);
  writeJSON("agenda.json", agenda);
  res.json({ message: "Agenda actualizada", data: req.body });
});

// Añadir un sponsor
app.post("/sponsors", (req, res) => {
  const sponsors = readJSON("sponsors.json");
  sponsors.push(req.body);
  writeJSON("sponsors.json", sponsors);
  res.json({ message: "Sponsor agregado", data: req.body });
});

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`API corriendo`)
);