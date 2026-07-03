const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/", (req, res) => {
  db.all(
    `
    SELECT
      moulds.id,
      moulds.mould_code,
      moulds.cavities,
      moulds.status,
      products.product_code,
      brands.name || ' ' || mobile_models.name || ' - ' || series.name AS product_description
    FROM moulds
    JOIN products ON moulds.product_id = products.id
    JOIN brands ON products.brand_id = brands.id
    JOIN mobile_models ON products.mobile_model_id = mobile_models.id
    JOIN series ON products.series_id = series.id
    WHERE moulds.active = 1
    ORDER BY moulds.id DESC
    `,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

router.post("/", (req, res) => {
  const { mould_code, product_id, cavities, status } = req.body;

  if (!mould_code || !product_id) {
    return res.status(400).json({ error: "Mould code and product are required" });
  }

  db.run(
    `
    INSERT INTO moulds (mould_code, product_id, cavities, status)
    VALUES (?, ?, ?, ?)
    `,
    [mould_code.trim(), product_id, cavities || null, status || "Development"],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });

      res.json({
        id: this.lastID,
        mould_code,
        product_id,
        cavities,
        status,
      });
    }
  );
});

module.exports = router;