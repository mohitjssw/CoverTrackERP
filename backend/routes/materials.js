const express = require("express");
const db = require("../database");

const router = express.Router();

function generateMaterialCode(id) {
  return `MAT${String(id).padStart(5, "0")}`;
}

router.get("/", (req, res) => {
  db.all(
    `
    SELECT
      materials.*,
      material_categories.name AS category_name
    FROM materials
    JOIN material_categories
      ON materials.category_id = material_categories.id
    WHERE materials.active = 1
    ORDER BY material_code
    `,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

router.post("/", (req, res) => {

  const {
    category_id,
    supplier,
    grade,
    colour,
    hardness,
    specific_gravity,
    drying_temp,
    drying_time,
    melt_temp_min,
    melt_temp_max,
    mould_temp_min,
    mould_temp_max,
    remarks
  } = req.body;

  if (!category_id || !grade) {
    return res.status(400).json({
      error: "Material Category and Grade are required"
    });
  }

  db.run(
    `
    INSERT INTO materials
    (
      category_id,
      supplier,
      grade,
      colour,
      hardness,
      specific_gravity,
      drying_temp,
      drying_time,
      melt_temp_min,
      melt_temp_max,
      mould_temp_min,
      mould_temp_max,
      remarks
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      category_id,
      supplier || "",
      grade,
      colour || "",
      hardness || "",
      specific_gravity || null,
      drying_temp || null,
      drying_time || null,
      melt_temp_min || null,
      melt_temp_max || null,
      mould_temp_min || null,
      mould_temp_max || null,
      remarks || ""
    ],
    function (err) {

      if (err)
        return res.status(400).json({ error: err.message });

      const id = this.lastID;
      const materialCode = generateMaterialCode(id);

      db.run(
        "UPDATE materials SET material_code=? WHERE id=?",
        [materialCode, id],
        () => {

          res.json({
            id,
            material_code: materialCode
          });

        }
      );

    }
  );

});

module.exports = router;