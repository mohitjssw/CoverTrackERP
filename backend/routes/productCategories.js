const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/", (req, res) => {
  db.all(
    `
    SELECT
      id,
      code,
      name,
      description
    FROM product_categories
    WHERE active = 1
    ORDER BY name
    `,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

router.post("/", (req, res) => {
  const { code, name, description } = req.body;

  if (!code || !name) {
    return res.status(400).json({
      error: "Code and Name are required",
    });
  }

  db.run(
    `
    INSERT INTO product_categories
    (code, name, description)
    VALUES (?, ?, ?)
    `,
    [code.trim().toUpperCase(), name.trim(), description || ""],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });

      res.json({
        id: this.lastID,
      });
    }
  );
});

module.exports = router;