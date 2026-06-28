require("./database");

const express = require("express");
const cors = require("cors");

const locationRoutes = require("./routes/locations");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use("/api/locations", locationRoutes);

app.get("/", (req, res) => {
  res.json({
    app: "CoverTrack ERP API",
    status: "Running"
  });
});

app.listen(PORT, () => {
  console.log(`✅ CoverTrack ERP API running on http://localhost:${PORT}`);
});