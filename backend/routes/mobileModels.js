const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/", (req, res) => {
  db.all(
    `
    SELECT 
      mobile_models.id,
      mobile_models.brand_id,
      mobile_models.name,
      brands.name AS brand_name
    FROM mobile_models
    JOIN brands ON mobile_models.brand_id = brands.id
    WHERE mobile_models.active = 1
    ORDER BY brands.name, mobile_models.name
    `,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

router.post("/", (req, res) => {
  const { brand_id, name } = req.body;

  if (!brand_id || !name || !name.trim()) {
    return res.status(400).json({ error: "Brand and model name are required" });
  }

  db.run(
    "INSERT INTO mobile_models (brand_id, name) VALUES (?, ?)",
    [brand_id, name.trim()],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });

      res.json({
        id: this.lastID,
        brand_id,
        name: name.trim(),
      });
    }
  );
});

module.exports = router;