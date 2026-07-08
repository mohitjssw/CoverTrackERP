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
      if (err) return res.status(400).json({ error: err.message });

      res.json({
        id: this.lastID,
        code,
        name: cleanName,
      });
    }
  );
});

router.put("/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Brand name is required" });
  }

  const cleanName = name.trim();
  const code = generateBrandCode(cleanName);

  db.run(
    "UPDATE brands SET code = ?, name = ? WHERE id = ?",
    [code, cleanName, id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });

      res.json({
        id,
        code,
        name: cleanName,
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.run(
    "UPDATE brands SET active = 0 WHERE id = ?",
    [id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });

      res.json({ id, active: 0 });
    }
  );
});

module.exports = router;