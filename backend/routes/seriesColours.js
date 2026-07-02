const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/", (req, res) => {
  db.all(
    `
    SELECT
      series_colours.id,
      series_colours.series_id,
      series.name AS series_name,
      series_colours.colour_name,
      series_colours.colour_code
    FROM series_colours
    JOIN series ON series_colours.series_id = series.id
    WHERE series_colours.active = 1
    ORDER BY series.name, series_colours.colour_name
    `,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

module.exports = router;