const express = require("express");
const db = require("../database");

const router = express.Router();

function generateProductCode(id) {
  return `P${String(id).padStart(6, "0")}`;
}

function generateVariantCode(productCode, colourCode) {
  return `${productCode}-${colourCode}`;
}

// GET products with variants
router.get("/", (req, res) => {
  db.all(
    `
    SELECT
      products.id,
      products.product_code,
      brands.name || ' ' || mobile_models.name || ' - ' || series.name AS description,
      products.status,
      GROUP_CONCAT(series_colours.colour_name, ', ') AS colours,
      GROUP_CONCAT(product_variants.variant_code, ', ') AS variant_codes
    FROM products
    JOIN brands ON products.brand_id = brands.id
    JOIN mobile_models ON products.mobile_model_id = mobile_models.id
    JOIN series ON products.series_id = series.id
    LEFT JOIN product_variants ON product_variants.product_id = products.id
    LEFT JOIN series_colours ON product_variants.series_colour_id = series_colours.id
    WHERE products.active = 1
    GROUP BY products.id
    ORDER BY products.id DESC
    `,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// ADD product and auto-create variants from series colours
router.post("/", (req, res) => {
  const { brand_id, mobile_model_id, series_id, status } = req.body;

  if (!brand_id || !mobile_model_id || !series_id) {
    return res.status(400).json({ error: "Brand, model and series are required" });
  }

  db.run(
    `
    INSERT INTO products (brand_id, mobile_model_id, series_id, status)
    VALUES (?, ?, ?, ?)
    `,
    [brand_id, mobile_model_id, series_id, status || "Development"],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });

      const productId = this.lastID;
      const productCode = generateProductCode(productId);

      db.run(
        "UPDATE products SET product_code = ? WHERE id = ?",
        [productCode, productId],
        (updateErr) => {
          if (updateErr) return res.status(500).json({ error: updateErr.message });

          db.all(
            `
            SELECT id, colour_code 
            FROM series_colours 
            WHERE series_id = ? AND active = 1
            `,
            [series_id],
            (colourErr, colours) => {
              if (colourErr) return res.status(500).json({ error: colourErr.message });

              const stmt = db.prepare(
                "INSERT OR IGNORE INTO product_variants (product_id, series_colour_id, variant_code) VALUES (?, ?, ?)"
              );

              colours.forEach((colour) => {
                const variantCode = generateVariantCode(productCode, colour.colour_code);
                stmt.run(productId, colour.id, variantCode);
              });

              stmt.finalize();

              res.json({
                id: productId,
                product_code: productCode,
                variants_created: colours.length,
              });
            }
          );
        }
      );
    }
  );
});

module.exports = router;