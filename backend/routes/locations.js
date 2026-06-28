const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json([
        {
            code: "FAC",
            name: "Shahjahanpur Factory",
            type: "Manufacturing"
        },
        {
            code: "GGN",
            name: "Gurgaon Warehouse",
            type: "Warehouse"
        }
    ]);

});

module.exports = router;