const express = require("express");
const db = require("../database");

const router = express.Router();

function generateBrandCode(name) {
  return name
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .substring(0, 3);
}

// GET all brands
router.get("/", (req, res) => {
  db.all(
    "SELECT id, code, name FROM brands WHERE active = 1 ORDER BY name",
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// ADD brand
router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Brand name is required" });
  }

  const cleanName = name.trim();
  const code = generateBrandCode(cleanName);

  db.run(
    "INSERT INTO brands (code, name) VALUES (?, ?)",
    [code, cleanName],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      res.json({
        id: this.lastID,
        code,
        name: cleanName,
      });
    }
  );
});

module.exports = router;